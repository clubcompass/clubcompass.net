import { Club } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type RequestToJoinClubArgs = {
  clubId: Club["id"];
};

export type RequestToJoinClubPayload = Awaited<
  ReturnType<typeof requestToJoinClub>
>;

export const requestToJoinClub = async (
  _parent: any,
  { clubId }: RequestToJoinClubArgs,
  { prisma, auth }: Context
): Promise<typeof invites> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data");

  const { invites } = await prisma.user.update({
    where: {
      id: token.id,
    },
    data: {
      invites: {
        create: {
          club: {
            connect: {
              id: clubId,
            },
          },
          type: "INCOMING",
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
