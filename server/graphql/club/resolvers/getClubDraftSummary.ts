import { Club } from "@prisma/client";
import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

export type GetClubDraftSummaryArgs = { clubId: Club["id"] };

export type GetClubDraftSummaryPayload = Awaited<
  ReturnType<typeof getClubDraftSummary>
>;

export const getClubDraftSummary = async (
  _parent: any,
  { clubId }: GetClubDraftSummaryArgs,
  { prisma }: Context
): Promise<typeof club> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      name: true,
      status: true,
      email: true,
      tags: {
        select: {
          name: true,
        },
      },
      meetingDate: true,
      location: true,
      description: true,
      members: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          ccid: true,
          email: true,
          roles: {
            where: {
              clubId: clubId,
            },
            select: {
              name: true,
            },
          },
        },
      },
      teacher: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          ccid: true,
          email: true,
        },
      },
      links: {
        select: {
          id: true,
          name: true,
          type: true,
          link: true,
        },
      },
    },
  });

  if (!club)
    throw new ApolloError("Club not found", "RESOURCE_NOT_FOUND", { clubId });

  if (!(club.status === "DRAFT" || club.status === "REVIEW"))
    throw new ApolloError(
      "Club not in draft or review status",
      "CONSTRAINT_FAILED",
      { clubId }
    );

  return club;
};
