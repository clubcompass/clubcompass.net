import { Resolvers } from "../types/resolversTypes";
import { register } from "./resolvers/register";
import { login } from "./resolvers/login";
import { changePassword } from "./resolvers/changePassword";
import { findUserBySession } from "./resolvers/findUserBySession";
const resolvers: Resolvers = {
  Mutation: {
    register,
    login,
    changePassword,
  },
  Query: {
    findUserBySession,
  },
};
export default resolvers;
