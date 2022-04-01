import { User, Tag } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type UpdateUserInterestsArgs = {
  id: User["id"];
  tags: Tag[];
};

export type UpdateUserInterestsPayload = Awaited<
  ReturnType<typeof updateUserInterests>
>;

export const updateUserInterests = async (
  _parent: any,
  { id, tags }: UpdateUserInterestsArgs,
  { prisma, auth }: Context
): Promise<typeof interests> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user)
    throw new ApolloError("User not found", "RESOUCE_NOT_FOUND", { id });

  if (auth.id !== user.id)
    throw new ApolloError("Unauthorized", "UNAUTHORIZED_ACCESS", { id });

  const { interests } = await prisma.user.update({
    where: {
      id,
    },
    data: {
      interests: {
        set: [],
        connect: tags,
      },
    },
    include: {
      interests: {
        select: {
          name: true,
        },
      },
    },
  });

  return interests;
};
