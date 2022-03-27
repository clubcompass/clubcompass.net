import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server-micro";
import type { Role, Tag, User, Club } from "@prisma/client";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";
import { generateSlug } from "../../../utils/generateSlug";
import { validate } from "../../../utils/validation";
import { createClubSchema } from "../../../utils/validation/schemas/club";

export interface CreateClubData extends Partial<Omit<Club, "id" | "slug">> {
  // vicePresidentId?: User["id"];
  // secretaryId?: User["id"];
  // treasurerId?: User["id"];
  // teacherId?: User["id"];
  // links?: Link[];
  tags?: Tag[];
}

export interface CreateClubArgs {
  data: CreateClubData;
}

export type CreateClubPayload = Awaited<ReturnType<typeof createClub>>;

interface UserRoles
  extends Pick<Role, "name" | "color" | "type" | "description"> {
  users?: { connect: { id: User["id"] } };
}

export const createClub = async (
  _parent: any,
  { data }: CreateClubArgs,
  { prisma, auth: president }: Context
): Promise<typeof club> => {
  const { valid, errors } = await validate({
    schema: createClubSchema as any,
    data,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const nameExists = await prisma.club.findUnique({
    where: { name: data?.name },
  });

  if (nameExists) {
    throw new ApolloError("Club name already exists", "CLUB_NAME_EXISTS", {
      path: "name",
      name: data?.name,
    });
  }

  if (data?.teacherId) {
    const { type } = await prisma.user.findUnique({
      where: { id: data?.teacherId },
    });

    if (type !== "TEACHER") {
      throw new ApolloError(
        "Teacher id is associated with a non-teacher account"
      );
    }
  }

  const roles: UserRoles[] = [
    {
      name: "president",
      color: "#FAFAFA",
      type: "LEADER",
      description: "president description",
      users: { connect: { id: president.id } },
    },
    {
      name: "vicePresident",
      color: "#FAFAFA",
      type: "LEADER",
      description: "vice president description",
      // ...(data?.vicePresidentId && {
      //   users: { connect: { id: data?.vicePresidentId } },
      // }),
    },
    {
      name: "secretary",
      color: "#FAFAFA",
      type: "LEADER",
      description: "secretary description",
      // ...(data?.secretaryId
      //   ? { users: { connect: { id: data?.secretaryId } } }
      //   : {}),
    },
    {
      name: "treasurer",
      color: "#FAFAFA",
      type: "LEADER",
      description: "treasurer description",
      // ...(data?.treasurerId
      //   ? { users: { connect: { id: data?.treasurerId } } }
      //   : {}),
    },
  ];

  const members = () => {
    const members: { id: User["id"] }[] = [];
    if (president.id) members.push({ id: president.id });
    // if (data?.vicePresidentId) members.push({ id: data?.vicePresidentId });
    // if (data?.secretaryId) members.push({ id: data?.secretaryId });
    // if (data?.treasurerId) members.push({ id: data?.treasurerId });
    return members;
  };

  const club = await prisma.club.create({
    data: {
      name: data?.name,
      slug: generateSlug(data?.name),
      ...data,
      roles: {
        create: roles,
      },
      ...(members && {
        members: {
          connect: members(),
        },
      }),
      // ...(data?.links && { links: { create: [...data?.links] } }),
      ...(data?.tags && { tags: { connect: [...data?.tags] } }),
    },
    include: {
      tags: true,
      // links: true,
      members: {
        select: {
          firstname: true,
          lastname: true,
          roles: {
            where: {
              club: {
                name: data?.name,
              },
            },
          },
        },
      },
    },
  });

  // if (data?.teacherId) {
  //   await prisma.club.update({
  //     where: {
  //       id: club.id,
  //     },
  //     data: {
  //       teacher: {
  //         connect: {
  //           id: data?.teacherId,
  //         },
  //       },
  //     },
  //   });
  // }

  return club;
};
