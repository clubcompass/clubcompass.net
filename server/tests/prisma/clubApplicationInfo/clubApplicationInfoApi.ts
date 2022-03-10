import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { ClubApplicationInfoWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./clubApplicationInfoDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueClubApplicationInfo = async (
  where: ClubApplicationInfoWhereUniqueInput
): Promise<Client.ClubApplicationInfo> => {
  const { findUniqueClubApplicationInfo: uniqueClubApplicationInfo } =
    await request(url, doc.findUniqueClubApplicationInfo, {
      where,
    });
  return uniqueClubApplicationInfo;
};

export const clubApplicationInfo = {
  findUniqueClubApplicationInfo,
};
