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
  { prisma, auth }: Context
): Promise<typeof deletedClub> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      roles: {
        where: {
          name: {
            equals: "president",
          },
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!club) throw new ApolloError("Club was not found", "NO_CLUB", { clubId });

  if (auth.type !== "ASB") {
    let ids = club.roles[0].users.map((user) => user.id);
    if (!ids.includes(auth.id)) {
      throw new ApolloError(
        "You are not authorized to do this",
        "UNAUTHORIZED"
      );
    }
  }

  const deletedClub = await prisma.club.delete({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return deletedClub;
};
