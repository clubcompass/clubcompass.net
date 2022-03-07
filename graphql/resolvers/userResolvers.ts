import { createUser } from "./user/mutations";
import { user } from "./user/queries";

export const userResolvers = {
  Query: { user },
  Mutation: { createUser },
};
