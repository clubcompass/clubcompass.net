import { createUser, deleteUser } from "./mutations";
import { user, students, teachers } from "./queries";
import { club, clubs } from "../club/queries";

export const userResolvers = {
  Query: { user, students, teachers },
  Mutation: { createUser, deleteUser },
  // User: {
  //   clubs,
  // },
};
