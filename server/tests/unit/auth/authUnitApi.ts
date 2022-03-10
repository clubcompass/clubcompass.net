// import * as Client from "@prisma/client";
import { request, ClientError } from "graphql-request";
import {
  AuthPayload,
  RegisterArgs,
  LoginArgs,
} from "../../../graphql/auth/auth";
import * as doc from "./authUnitDocuments";

// const url = process.env.SERVER_URL as string
const url = process.env.SERVER_URL as string;

export const register = async (
  data: RegisterArgs
): Promise<AuthPayload | ClientError> => {
  try {
    const { register: newUser }: { register: AuthPayload } = await request(
      url,
      doc.register,
      {
        data,
      }
    );
    return newUser;
  } catch (e) {
    return e as ClientError;
  }
};

export const login = async (
  data: LoginArgs
): Promise<AuthPayload | ClientError> => {
  try {
    const { login: user }: { login: AuthPayload } = await request(
      url,
      doc.login,
      {
        data,
      }
    );
    return user;
  } catch (e) {
    return e as ClientError;
  }
};

export const auth = {
  register,
  login,
};
