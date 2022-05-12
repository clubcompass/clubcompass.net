import { Context } from "../../ctx";
import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type ApproveClubArgs = {
  clubId: Club["id"];
};

export type ApproveClubPayload = Awaited<ReturnType<typeof approveClub>>;

export const approveClub = async (
  _parent: any,
  { clubId }: ApproveClubArgs,
  { prisma }: Context
): Promise<typeof club> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      status: true,
    },
  });

  if (club.status !== "REVIEW")
    throw new ApolloError("Club is not available for review");

  const approvedClub = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      status: "APPROVED",
      approval: true,
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });

  if (!club) throw new ApolloError("Club was not found", "NO_CLUB", { clubId });

  return approvedClub;
};
