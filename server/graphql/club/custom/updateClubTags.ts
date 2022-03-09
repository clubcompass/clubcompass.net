import { Context } from "../../ctx";

type updateTagInput = {
  clubId: number;
  tagIds: number[];
};
export const updateClubTags = async (
  _parent: any,
  { clubId, tagIds }: updateTagInput,
  { prisma }: Context
): Promise<any> => {
  const tags = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const club = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      tags: {
        set: [],
        connect: tags,
      },
    },
    include: {
      tags: true,
    },
  });

  return club;
};
