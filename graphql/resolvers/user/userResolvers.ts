import { createUser } from "./mutations";
import { user } from "./queries";

export const userResolvers = {
  Query: { user },
  Mutation: { createUser },
};
