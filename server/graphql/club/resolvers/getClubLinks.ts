import { Context } from "../../ctx";
import { Club } from "@prisma/client";

export type GetClubLinksArgs = {
  clubId: Club["id"];
};

export type GetClubLinksPayload = Awaited<ReturnType<typeof getClubLinks>>;

export const getClubLinks = async (
  _parent: any,
  { clubId }: GetClubLinksArgs,
  { prisma }: Context
): Promise<typeof links> => {
  const { links } = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      links: {
        select: {
          id: true,
          name: true,
          link: true,
          type: true,
        },
      },
    },
  });

  console.log(links);

  return links;
};
