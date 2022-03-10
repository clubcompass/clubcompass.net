import { Resolvers } from "../resolversTypes";
import { register } from "./register";
import { login } from "./login";
const resolvers: Resolvers = {
  Mutation: {
    register,
    login,
  },
};
export default resolvers;
