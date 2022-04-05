import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

import { Context } from "../../ctx";

export type JoinClubArgs = {
  clubId: Club["id"];
};

export type JoinClubPayload = Awaited<ReturnType<typeof joinClub>>;

export const joinClub = async (
  _parent: any,
  { clubId }: JoinClubArgs,
  { prisma, auth: student }: Context
): Promise<typeof user> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      availability: true,
      members: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!club) throw new ApolloError("Club not found", "RESOURCE_NOT_FOUND");
  if (club.availability !== "OPEN")
    throw new ApolloError("Club is not open", "UNAUTHORIZED_ACCESS");

  const memberIds = club.members.map((member) => member.id);

  if (memberIds.includes(student.id)) {
    throw new ApolloError(
      "You are already a member of this club",
      "UNAUTHORIZED_ACCESS"
    );
  }

  const user = await prisma.user.update({
    where: {
      id: student.id,
    },
    data: {
      clubs: {
        connect: {
          id: clubId,
        },
      },
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      clubs: {
        where: {
          id: clubId,
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return user;
};
