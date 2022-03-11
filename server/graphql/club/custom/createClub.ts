import { Context } from "../../ctx";
import { Club, Link, ClubApplicationInfo, Tag, Invite } from "@prisma/client";
import { link } from "../../../tests/prisma/link/linkApi";
import { clubApplicationInfo } from "../../../tests/prisma/clubApplicationInfo/clubApplicationInfoApi";

type CreateClubArgs = {
  name: string;
  description?: string;
  email?: string;
  meetingDate?: string;
  location?: string;
  approval?: string;
  status?: string;
  availability?: string;
  links?: Link[];
  applicationInfo?: ClubApplicationInfo;
  tagIds?: number[];
  inviteIds?: number[];
  vicePresidentId?: number;
  secretaryId?: number;
  treasurerId?: number;
};

export const createClub = async (
  _parent: any,
  {
    data: { name, vicePresidentId, secretaryId, treasurerId, ...data },
  }: { data: CreateClubArgs },
  { prisma }: Context
): Promise<any> => {
  const userId = 5;

  const club = await prisma.club.create({
    data: {
      name,
      slug: name
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""),
      ...data,
      roles: {
        create: {
          name: "president",
          color: "#FAFAFA",
          type: "LEADERSHIP",
          description: "president description",
          users: {
            connect: { id: userId },
          },
          ...(vicePresidentId && {
            name: "vice president",
            color: "#FAFAFA",
            type: "LEADERSHIP",
            description: "vice president description",
            users: {
              connect: { id: vicePresidentId },
            },
          }),
          ...(secretaryId && {
            name: "secretary",
            color: "#FAFAFA",
            type: "LEADERSHIP",
            description: "secretary",
            users: {
              connect: { id: secretaryId },
            },
          }),
          ...(treasurerId && {
            name: "treasurer",
            color: "#FAFAFA",
            type: "LEADERSHIP",
            description: "treasurer",
            users: {
              connect: { id: treasurerId },
            },
          }),
        },
      },
      // ...(data?.links && {
      //   links: data.links.map((link) => ({
      //     create: { ...link },
      //   })),
      // }),
      // ...(data?.tagIds && {
      //   tags: {
      //     connect: data.tagIds.map((tagId) => ({
      //       id: tagId,
      //     })),
      //   },
      // }),
      // ...(data?.inviteIds && {
      //   invites: data.inviteIds.map((inviteId) => ({
      //     create: {
      //       user: {
      //         connect: {
      //           id: inviteId,
      //         },
      //       },
      //     },
      //   })),
      // }),
      // ...(data?.applicationInfo && {
      //   applicationInfo: { create: data.applicationInfo },
      // }),
    },
  });

  return club;
};
