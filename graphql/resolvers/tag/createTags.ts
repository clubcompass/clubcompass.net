import { prisma } from "../../../config/prisma";

export const createTags = async (_: any, { tags }: { tags: string[] }) => {
  for (let i = 0; i < tags.length; i++) {
    const name = tags[i];
    await prisma.tag.create({
      data: {
        name,
      },
    });
  }

  return tags.length;
};
