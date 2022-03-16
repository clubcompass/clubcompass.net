import { ApolloError, AuthenticationError } from "apollo-server-micro";
import type { User, ProjectedExpenses, ProjectedRevenue } from "@prisma/client";
import type { ClubApplicationInfo } from "../../types/schemaTypes";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";
import { generateSlug } from "../../../utils/generateSlug";
import { Club } from "../../types/schemaTypes";

export interface CreateClubData
  extends Partial<Omit<Club, "id" | "slug" | "applicationInfo">> {
  vicePresidentId?: User["id"];
  secretaryId?: User["id"];
  treasurerId?: User["id"];
  teacherId?: User["id"];
  applicationInfo?: ClubApplicationInfo;
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
      teacherId,
      applicationInfo,
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
    const members: { id: number }[] = [];
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
            ...(applicationInfo?.projectedRevenue && {
              projectedRevenue: {
                create: applicationInfo?.projectedRevenue,
              },
            }),
            ...(applicationInfo?.projectedExpenses && {
              projectedExpenses: {
                create: applicationInfo?.projectedExpenses,
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
