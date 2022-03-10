import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { LinkWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./linkDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueLink = async (
  where: LinkWhereUniqueInput
): Promise<Client.Link> => {
  const { findUniqueLink: uniqueLink } = await request(
    url,
    doc.findUniqueLink,
    {
      where,
    }
  );
  return uniqueLink;
};

export const link = {
  findUniqueLink,
};
