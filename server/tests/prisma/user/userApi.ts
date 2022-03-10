import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { UserWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./userDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueUser = async (
  where: UserWhereUniqueInput
): Promise<Client.User> => {
  const { findUniqueUser: uniqueUser } = await request(
    url,
    doc.findUniqueUser,
    {
      where,
    }
  );
  return uniqueUser;
};

export const deleteOneUser = async (
  where: UserWhereUniqueInput
): Promise<Client.User> => {
  const { deleteOneUser: deletedUser } = await request(url, doc.deleteOneUser, {
    where,
  });
  return deletedUser;
};

export const user = {
  findUniqueUser,
  deleteOneUser,
};
