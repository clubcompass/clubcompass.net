import { ApolloError, AuthenticationError } from "apollo-server-micro";
import type { Link, Role, Tag, User, Club } from "@prisma/client";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";
import { generateSlug } from "../../../utils/generateSlug";

export interface CreateClubData extends Partial<Omit<Club, "id" | "slug">> {
  vicePresidentId?: User["id"];
  secretaryId?: User["id"];
  treasurerId?: User["id"];
  teacherId?: User["id"];
  links?: Link[];
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
  {
    data: {
      name,
      vicePresidentId,
      secretaryId,
      treasurerId,
      teacherId,
      links,
      tags,
      ...data
    },
  }: CreateClubArgs,
  { prisma, auth }: Context
): Promise<typeof club> => {
  const president = getAuthenticatedUser({ auth });

  if (!president) throw new AuthenticationError("No token data");

  const nameExists = await prisma.club.findUnique({
    where: { name },
  });

  if (nameExists) {
    throw new ApolloError("Club name already exists");
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
      ...(vicePresidentId && { users: { connect: { id: vicePresidentId } } }),
    },
    {
      name: "secretary",
      color: "#FAFAFA",
      type: "LEADER",
      description: "secretary description",
      ...(secretaryId ? { users: { connect: { id: secretaryId } } } : {}),
    },
    {
      name: "treasurer",
      color: "#FAFAFA",
      type: "LEADER",
      description: "treasurer description",
      ...(treasurerId ? { users: { connect: { id: treasurerId } } } : {}),
    },
  ];

  const members = () => {
    const members: { id: User["id"] }[] = [];
    if (president.id) members.push({ id: president.id });
    if (vicePresidentId) members.push({ id: vicePresidentId });
    if (secretaryId) members.push({ id: secretaryId });
    if (treasurerId) members.push({ id: treasurerId });
    return members;
  };

  const club = await prisma.club.create({
    data: {
      name,
      slug: generateSlug(name),
      ...data,
      roles: {
        create: roles,
      },
      ...(members && {
        members: {
          connect: members(),
        },
      }),
      ...(links && { links: { create: [...links] } }),
      ...(tags && { tags: { connect: [...tags] } }),
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
                name: name,
              },
            },
          },
        },
      },
    },
  });

  if (teacherId) {
    await prisma.club.update({
      where: {
        id: club.id,
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

  return club;
};
