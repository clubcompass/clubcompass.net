import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type GetAdvisorClubsArgs = {};

export type GetAdvisorClubsPayload = Awaited<
  ReturnType<typeof getAdvisorClubs>
>;

export const getAdvisorClubs = async (
  _parent: any,
  _args: GetAdvisorClubsArgs,
  { prisma, auth }: Context
): Promise<typeof clubs> => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      advisor: {
        select: {
          id: true,
          slug: true,
          name: true,
          status: true,
          location: true,
          meetingDate: true,
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
      id: auth.id,
    });

  const clubs = user.advisor;

  return clubs;
};
