import { Context } from "../../ctx";
import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type DeclineClubArgs = {
  clubId: Club["id"];
};

export type DeclineClubPayload = Awaited<ReturnType<typeof declineClub>>;

export const declineClub = async (
  _parent: any,
  { clubId }: DeclineClubArgs,
  { prisma }: Context
): Promise<typeof club> => {
  // only asb
  // cant decline already declined club?
  const club = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      status: "DECLINED",
      approval: false,
    },
    select: {
      id: true,
      name: true,
      approval: true,
    },
  });

  if (!club) throw new ApolloError("Club was not found", "NO_CLUB", { clubId }); // has no effect on operation

  return club;
};
