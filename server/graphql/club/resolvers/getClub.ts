import { Club } from "@prisma/client";
import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

export type GetClubArgs = { id: Club["id"] } | { slug: Club["slug"] };

export type GetClubPayload = Awaited<ReturnType<typeof getClub>>;

export const getClub = async (
  _parent: any,
  identifier: GetClubArgs,
  { prisma, auth: user }: Context
): Promise<typeof club & { isMember?: boolean }> => {
  const club = await prisma.club.findUnique({
    where: {
      ...identifier,
    },
    select: {
      id: true,
      name: true,
      approval: true,
      description: true,
      tags: {
        select: {
          name: true,
        },
      },
      availability: true,
      meetingDate: true,
      location: true,
      email: true,
      links: true,
      status: true,
      members: {
        select: {
          firstname: true,
          lastname: true,
          roles: {
            where: {
              club: {
                [Object.keys(identifier)[0]]: {
                  equals: identifier[Object.keys(identifier)[0]],
                },
              },
            },
            select: {
              name: true,
              type: true,
              color: true,
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

  if (!club.approval && Object.keys(identifier)[0] === "slug") {
    throw new ApolloError(
      "The requested club has not been approved",
      "UNAPPROVED_CLUB"
    );
  }

  if (user) {
    const userClubs = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        clubs: {
          select: {
            id: true,
          },
        },
      },
    });

    return { ...club, isMember: userClubs.clubs.some((c) => c.id === club.id) };
  }

  return club;
};
