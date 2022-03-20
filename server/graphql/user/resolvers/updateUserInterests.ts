import { User, Tag } from "@prisma/client";
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
  { prisma }: Context
): Promise<typeof interests> => {
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
