import { ApolloError, AuthenticationError } from "apollo-server-micro";
import type { User } from "@prisma/client";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";
import { generateSlug } from "../../../utils/generateSlug";
import { Club } from "../../types/schemaTypes";

export interface CreateClubData
  extends Partial<
    Omit<Club, "id" | "slug"> & { applicationInfo: { teacherId: User["id"] } }
  > {
  vicePresidentId?: User["id"];
  secretaryId?: User["id"];
  treasurerId?: User["id"];
}

export interface CreateClubArgs {
  data: CreateClubData;
}

export type CreateClubPayload = Awaited<ReturnType<typeof createClub>>;

export const createClub = async (
  _parent: any,
  {
    data: {
      name,
      vicePresidentId,
      secretaryId,
      treasurerId,
      applicationInfo: {
        teacherId,
        projectedExpenses,
        projectedRevenue,
        ...applicationInfo
      },
      links,
      tags,
      invites,
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

  const { type } = await prisma.user.findUnique({
    where: { id: teacherId },
  });

  if (type !== "TEACHER") {
    throw new ApolloError(
      "Teacher id is associated with a non-teacher account"
    );
  }

  const roles = [
    {
      name: "president",
      color: "#FAFAFA",
      type: "LEADERSHIP",
      description: "president description",
      users: { connect: { id: president.id } },
    },
    {
      name: "vicePresident",
      color: "#FAFAFA",
      type: "LEADERSHIP",
      description: "vice president description",
      ...(vicePresidentId && { users: { connect: { id: vicePresidentId } } }),
    },
    {
      name: "secretary",
      color: "#FAFAFA",
      type: "LEADERSHIP",
      description: "secretary description",
      ...(secretaryId ? { users: { connect: { id: secretaryId } } } : {}),
    },
    {
      name: "treasurer",
      color: "#FAFAFA",
      type: "LEADERSHIP",
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
      members: {
        connect: members(),
      },
      ...(links && { links: { create: [...links] } }),
      ...(tags && { tags: { connect: [...tags] } }),
      ...(invites && {
        invites: invites.map((id) => ({
          create: {
            user: {
              connect: {
                id,
              },
            },
          },
        })),
      }),

      ...(applicationInfo && {
        applicationInfo: {
          create: {
            // ...(teacherId && { // why the fuck can't I do this????
            //   teacher: {
            //     connect: {
            //       id: teacherId,
            //     },
            //   },
            // }),
            ...applicationInfo,
            ...(projectedRevenue && {
              projectedRevenue: {
                create: projectedRevenue,
              },
            }),
            ...(projectedExpenses && {
              projectedExpenses: {
                create: projectedExpenses,
              },
            }),
          },
        },
      }),
    },
  });

  if (teacherId) {
    await prisma.club.update({
      where: {
        id: club.id,
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

  return club;
};
