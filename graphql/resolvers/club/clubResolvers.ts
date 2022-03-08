// import { createUser, deleteUser } from "./mutations";
import { club, clubs } from "./queries";

export const clubResolvers = {
  Query: { club, clubs },
  Mutation: {},
};
