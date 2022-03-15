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
  console.log(tags);

  const interests = await prisma.user
    .update({
      where: {
        id,
      },
      data: {
        interests: {
          set: [],
          connect: tags,
        },
      },
    })
    .interests();

  return interests;
};
