import { Context } from "../../ctx";
import { Tag } from "../../types/schemaTypes";

export type CreateTagsArgs = {
  names: Tag["name"][];
};

export type CreateTagsPayload = Awaited<ReturnType<typeof createTags>>;

export const createTags = async (
  _parent: any,
  { names }: CreateTagsArgs,
  { prisma }: Context
) => {
  const tags = await prisma.tag.createMany({
    data: names.map((name) => ({ name: name })),
    skipDuplicates: true,
  });

  return tags;
};
