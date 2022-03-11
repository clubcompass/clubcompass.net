import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { ClubWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./clubUnitDocuments";
const url = "http://localhost:3000/api/graphql";

export const findApprovedClubs = async (): Promise<[Client.Club]> => {
  const { findManyClub: clubs } = await request(url, doc.findApprovedClubs);

  return clubs;
};

export const findClubBySlug = async (
  where: ClubWhereUniqueInput
): Promise<Client.Club> => {
  const { findUniqueClub: club } = await request(url, doc.findClubBySlug, {
    where,
  });

  return club;
};

export const club = {
  findApprovedClubs,
  findClubBySlug,
};
