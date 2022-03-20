import { Tag } from "@prisma/client";
import { Context } from "../../ctx";

export type GetTagArgs = {};
export type GetTagsPayload = Awaited<ReturnType<typeof getTags>>;

export const getTags = async (
  _parent: any,
  _: GetTagArgs,
  { prisma }: Context
): Promise<typeof tags> => {
  const allTags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,

      clubs: {
        select: {
          approval: true,
        },
      },
    },
  });

  const tags = allTags.map(
    (tag): Pick<Tag, "id" | "name"> & { approvedCount: number } => {
      const approvedCount = tag.clubs.filter(
        ({ approval }) => approval === true
      ).length;

      delete tag.clubs;

      return {
        ...tag,
        approvedCount,
      };
    }
  );

  console.log(tags);

  return tags;
};
