import { ApolloError, UserInputError } from "apollo-server-micro";
import type { Role, Tag, User, Club } from "@prisma/client";
import { Context } from "../../ctx";
import { generateSlug } from "../../../utils/generateSlug";
import { validate } from "../../../utils/validation";
import { createClubSchema } from "../../../utils/validation/schemas/club";

export interface CreateClubData extends Partial<Omit<Club, "id" | "slug">> {
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
    schema: createClubSchema,
    data,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const nameExists = await prisma.club.findUnique({
    where: { name: data?.name },
    select: {
      name: true,
    },
  });

  if (nameExists) {
    throw new ApolloError("Club name already exists", "UNAUTHORIZED_ACTION", {
      path: "name",
      name: data?.name,
    });
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
    },
    {
      name: "secretary",
      color: "#FAFAFA",
      type: "LEADER",
      description: "secretary description",
    },
    {
      name: "treasurer",
      color: "#FAFAFA",
      type: "LEADER",
      description: "treasurer description",
    },
  ];

  const club = await prisma.club.create({
    data: {
      name: data?.name,
      slug: generateSlug(data?.name),
      ...data,
      roles: {
        create: roles,
      },
      members: {
        connect: {
          id: president.id,
        },
      },
      ...(data?.tags && { tags: { connect: [...data?.tags] } }),
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      email: true,
      meetingDate: true,
      location: true,
      availability: true,
      tags: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
      status: true,
      approval: true,
    },
  });

  return club;
};
