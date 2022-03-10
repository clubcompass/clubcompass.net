import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { TagWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./tagDocuments";
const url = process.env.SERVER_URL as string;

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
