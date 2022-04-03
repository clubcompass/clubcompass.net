import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type RequestToJoinClubArgs = {
  clubId: Club["id"];
};

export type RequestToJoinClubPayload = Awaited<
  ReturnType<typeof requestToJoinClub>
>;

export const requestToJoinClub = async (
  _parent: any,
  { clubId }: RequestToJoinClubArgs,
  { prisma, auth: student }: Context
): Promise<typeof invites> => {
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
      invites: {
        where: {
          userId: student.id,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!club) throw new ApolloError("Club not found", "RESOURCE_NOT_FOUND");

  if (club.availability !== "INVITE_ONLY") {
    throw new ApolloError("Club is not invite only", "UNAUTHORIZED_ACTION");
  }

  if (club.invites.length)
    throw new ApolloError(
      "You have already requested to join this club",
      "UNAUTHORIZED_ACTION"
    );

  const memberIds = club.members.map((member) => member.id);
  if (memberIds.includes(student.id)) {
    throw new ApolloError(
      "You are already a member of this club",
      "UNAUTHORIZED_ACCESS"
    );
  }

  const { invites } = await prisma.user.update({
    where: {
      id: student.id,
    },
    data: {
      invites: {
        create: {
          club: {
            connect: {
              id: clubId,
            },
          },
          type: "OUTGOING",
        },
      },
    },
    select: {
      invites: {
        select: {
          id: true,
          club: {
            select: {
              name: true,
            },
          },
          type: true,
        },
      },
    },
  });

  console.log(invites);

  return invites;
};
