import { ApolloError, AuthenticationError } from "apollo-server-micro";
import { User } from "@prisma/client";
import { Context } from "../../ctx";
import { Club } from "../../types/schemaTypes";
import { getAuthenticatedUser } from "../../../utils/auth";
import { generateSlug } from "../../../utils/generateSlug";
import { issueInvite } from "../../invite/resolvers/issueInvite";

interface EditClubData extends Partial<Omit<Club, "id" | "slug" | "members">> {
  vicePresidentId?: User["id"];
  secretaryId?: User["id"];
  treasurerId?: User["id"];
  teacherId: User["id"];
  members: User["ccid"][];
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
  { prisma, auth }: Context
): Promise<typeof club> => {
  const president = getAuthenticatedUser({ auth });
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

  const { projectedExpenses, projectedRevenue, ...applicationInfo } =
    data?.applicationInfo || {};

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

  const assignUser = async (type: string, id: number) => {
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

  if (vicePresidentId) await assignUser("vicePresidentId", vicePresidentId);

  if (secretaryId) await assignUser("vicePresidentId", vicePresidentId);

  if (treasurerId) await assignUser("vicePresidentId", vicePresidentId);

  if (teacherId) {
    await prisma.club.update({
      where: {
        id: clubId,
      },
      data: {
        applicationInfo: {
          create: {
            teacher: {
              connect: {
                id: teacherId,
              },
            },
          },
        },
      },
    });
  }

  if (members) {
    members.forEach(async (ccid) => {
      await issueInvite({}, { clubId, recipientCCID: ccid }, { prisma, auth }); // update func if not used anywhere else
    });
  }

  const club = await prisma.club.update({
    where: { id: clubId },
    data: {
      ...(name && { name, slug: generateSlug(name) }),
      ...data,
      links: links ? { set: [], create: links } : undefined,
      tags: tags ? { set: [], connect: tags } : undefined,
      ...((Object.keys(applicationInfo).length !== 0 ||
        projectedExpenses ||
        projectedRevenue) && {
        applicationInfo: {
          update: {
            ...applicationInfo,
            projectedExpenses: {
              set: [],
              create: projectedExpenses,
            },
            projectedRevenue: {
              set: [],
              create: projectedRevenue,
            },
          },
        },
      }),
    },
    include: {
      members: true,
    },
  });

  return club;
};
