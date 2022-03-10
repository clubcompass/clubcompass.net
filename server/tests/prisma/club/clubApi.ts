import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { ClubWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./clubDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueClub = async (
  where: ClubWhereUniqueInput
): Promise<Client.Club> => {
  const { findUniqueClub: uniqueClub } = await request(
    url,
    doc.findUniqueClub,
    {
      where,
    }
  );
  return uniqueClub;
};

export const club = {
  findUniqueClub,
};
