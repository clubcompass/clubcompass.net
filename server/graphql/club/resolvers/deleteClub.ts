import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { Club } from "../../types/schemaTypes";

export type DeleteClubArgs = {
  clubId: Club["id"];
};

export type DeleteClubPayload = Awaited<ReturnType<typeof deleteClub>>;

export const deleteClub = async (
  _parent: any,
  { clubId }: DeleteClubArgs,
  { prisma }: Context
): Promise<typeof club> => {
  // PERMISSIONS

  const exists = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
    },
  });

  if (!exists)
    throw new ApolloError("Club was not found", "NO_CLUB", { clubId });

  const club = await prisma.club.delete({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return club;
};
