import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { TagWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./tagDocuments";
const url = "http://localhost:3000/api/graphql";

export const findUniqueTag = async (
  where: TagWhereUniqueInput
): Promise<Client.Tag> => {
  const { findUniqueTag: uniqueTag } = await request(url, doc.findUniqueTag, {
    where,
  });
  return uniqueTag;
};

export const tag = {
  findUniqueTag,
};
