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
  // refactor to onDelete cascade
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
