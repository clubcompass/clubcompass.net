import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { UserWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./userUnitDocuments";
const url = "http://localhost:3000/api/graphql";

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

export const user = {
  findUniqueUser,
};
