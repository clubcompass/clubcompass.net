import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { LinkWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./linkDocuments";
const url = "http://localhost:3000/api/graphql";

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
