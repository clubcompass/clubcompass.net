import { Club } from "@prisma/client";
import { Context } from "../../ctx";

export type GetClubArgs = { id: Club["id"] } | { slug: Club["slug"] };

export type GetClubPayload = Awaited<ReturnType<typeof getClub>>;

export const getClub = async (
  _parent: any,
  identifier: GetClubArgs,
  { prisma }: Context
): Promise<typeof club> => {
  const club = await prisma.club.findUnique({
    where: {
      ...identifier,
    },
    select: {
      id: true,
      name: true,
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
      members: {
        select: {
          firstname: true,
          lastname: true,
          roles: {
            where: {
              club: {
                slug: {
                  equals: identifier[Object.keys(identifier)[0]],
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
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return club;
};
