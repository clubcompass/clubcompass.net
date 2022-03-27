import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server-micro";
import { User } from "@prisma/client";
import { Context } from "../../ctx";
// import { Club, Link, Tag, Invite } from "@prisma/client";
import { Club } from "../../types/schemaTypes";
import { getAuthenticatedUser } from "../../../utils/auth";
import { generateSlug } from "../../../utils/generateSlug";
import { issueInvite } from "../../invite/resolvers/issueInvite";
import { validate } from "../../../utils/validation";
import { editClubSchema } from "../../../utils/validation/schemas/club";

interface EditClubData
  extends Partial<
    Omit<
      Club,
      | "id"
      | "slug"
      | "members"
      | "applicationInfo"
      | "editors"
      | "roles"
      | "teacherId"
    >
  > {
  vicePresidentId?: User["id"];
  secretaryId?: User["id"];
  treasurerId?: User["id"];
  teacherId: User["id"];
  members: User["ccid"][];
  // links: Link[];
  // tags: Tag[];
  // invites: Invite[];
}

export interface EditClubArgs {
  clubId: Club["id"];
  data: EditClubData;
}

export type EditClubPayload = Awaited<ReturnType<typeof editClub>>;

export const editClub = async (
  _parent: any,
  {
    clubId,
    data: {
      name,
      vicePresidentId,
      secretaryId,
      treasurerId,
      members,
      teacherId,
      links,
      tags,
      invites,
      ...data
    },
  }: EditClubArgs,
  { prisma, auth: president }: Context
): Promise<typeof editedClub> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      roles: {
        where: {
          name: "president",
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!club) throw new ApolloError("Club not found", "RESOUCE_NOT_FOUND");

  let ids = club.roles[0].users.map((user) => user.id);
  if (!ids.includes(president.id)) {
    throw new ApolloError(
      "You are not authorized to do this",
      "UNAUTHORIZED_ACCESS"
    );
  }

  const { valid, errors } = await validate({
    schema: editClubSchema as any,
    data: {
      name,
      vicePresidentId,
      secretaryId,
      treasurerId,
      members,
      teacherId,
      links,
      tags,
      invites,
      ...data,
    },
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  if (!president) throw new AuthenticationError("No token data"); // better err message?

  const existingClub = await prisma.club.findUnique({
    where: { id: clubId },
  });

  if (!existingClub) throw new ApolloError("Club does not exist");

  const roles = await prisma.user // abstract into separate util function
    .findUnique({
      where: { id: president.id },
    })
    .roles({ where: { clubId }, select: { name: true } });

  if (!roles.some((role) => role.name === "president")) {
    throw new ApolloError("You are not the president of this club");
  }

  // const { projectedExpenses, projectedRevenue, ...applicationInfo } =
  //   data?.applicationInfo || {};

  if (name) {
    const nameExists = await prisma.club.findUnique({
      where: { name },
    });

    if (nameExists) {
      throw new ApolloError("Club name already exists");
    }
  }

  if (teacherId) {
    const { type } = await prisma.user.findUnique({
      where: { id: teacherId },
    });

    if (type !== "TEACHER") {
      throw new ApolloError(
        "Teacher id is associated with a non-teacher account"
      );
    }
  }

  const assignUser = async (type: string, id: string) => {
    const roles = await prisma.club
      .findUnique({
        where: { id: clubId },
      })
      .roles();
    const role = roles.find((role) => role.type === type);
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        roles: {
          connect: { id: role.id },
        },
      },
    });
    return user;
  };

  // if (vicePresidentId) await assignUser("vicePresidentId", vicePresidentId);

  // if (secretaryId) await assignUser("secretaryId", secretaryId);

  // if (treasurerId) await assignUser("treasurerId", treasurerId);

  if (teacherId) {
    await prisma.club.update({
      where: {
        id: clubId,
      },
      data: {
        teacher: {
          connect: {
            id: teacherId,
          },
        },
      },
    });
  }

  // if (members) {
  //   members.forEach(async (ccid) => {
  //     await issueInvite({}, { clubId, recipientCCID: ccid }, { prisma, auth }); // update func if not used anywhere else
  //   });
  // }

  const editedClub = await prisma.club.update({
    where: { id: clubId },
    data: {
      ...(name && { name, slug: generateSlug(name) }),
      ...data,
      links: links ? { deleteMany: {}, create: links } : undefined,
      tags: tags ? { set: [], connect: tags } : undefined,
    },
    include: {
      tags: true,
      links: true,
      members: {
        select: {
          firstname: true,
          lastname: true,
          roles: {
            where: {
              club: {
                id: {
                  equals: clubId,
                },
              },
            },
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
      invites: {
        select: {
          user: {
            select: {
              ccid: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return editedClub;
};
