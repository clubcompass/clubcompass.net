import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { ClubApplicationInfoWhereUniqueInput } from "../../graphql/resolversTypes";
import { ClubApplicationInfoFields } from "./clubApplicationInfoDocuments";
import * as doc from "./clubApplicationInfoDocuments";
const url = "http://localhost:3000/api/graphql";

export const findUniqueClubApplicationInfo = async (
  where: ClubApplicationInfoWhereUniqueInput
): Promise<Client.ClubApplicationInfo> => {
  // console.log(ClubApplicationInfoFields.definitions.map((d) => d.name));
  const { findUniqueClubApplicationInfo: uniqueClubApplicationInfo } =
    await request(url, doc.findUniqueClubApplicationInfo, {
      where,
    });
  return uniqueClubApplicationInfo;
};

export const clubApplicationInfo = {
  findUniqueClubApplicationInfo,
};
