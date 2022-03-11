import * as Client from "@prisma/client";
import { request } from "graphql-request";
import * as doc from "./tagUnitDocuments";
const url = "http://localhost:3000/api/graphql";

export const findManyTags = async (): Promise<[Client.Tag]> => {
  const { findManyTag: tags } = await request(url, doc.findManyTags);

  return tags;
};

export const tag = {
  findManyTags,
};
