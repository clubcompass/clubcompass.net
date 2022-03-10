import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { RoleWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./roleDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueRole = async (
  where: RoleWhereUniqueInput
): Promise<Client.Role> => {
  const { findUniqueRole: uniqueRole } = await request(
    url,
    doc.findUniqueRole,
    {
      where,
    }
  );
  return uniqueRole;
};

export const role = {
  findUniqueRole,
};
