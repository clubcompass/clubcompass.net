import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { InviteWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./inviteDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueInvite = async (
  where: InviteWhereUniqueInput
): Promise<Client.Invite> => {
  const { findUniqueInvite: uniqueInvite } = await request(
    url,
    doc.findUniqueInvite,
    {
      where,
    }
  );
  return uniqueInvite;
};

export const invite = {
  findUniqueInvite,
};
