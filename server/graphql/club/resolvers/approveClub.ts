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
  // only asb
  const club = await prisma.club.update({
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
      approval: true,
    },
  });

  if (!club) throw new ApolloError("Club was not found", "NO_CLUB", { clubId });

  return club;
};
