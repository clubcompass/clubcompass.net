import { Resolvers } from "../types/resolversTypes";
import { register } from "./resolvers/register";
import { checkEmail } from "./resolvers/checkEmail";
import { checkStudentId } from "./resolvers/checkStudentId";
import { login } from "./resolvers/login";
import { logout } from "./resolvers/logout";
import { changePassword } from "./resolvers/changePassword";
import { findUserBySession } from "./resolvers/findUserBySession";
import { sendVerificationEmail } from "./resolvers/sendVerificationEmail";
const resolvers: Resolvers = {
  Mutation: {
    register,
    login,
    logout,
    changePassword,
  },
  Query: {
    findUserBySession,
    checkEmail,
    checkStudentId,
    sendVerificationEmail,
  },
};
export default resolvers;
