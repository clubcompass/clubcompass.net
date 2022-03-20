import { client } from "../../requestClient";
import type {
  LoginArgs,
  LoginPayload,
  RegisterArgs,
  RegisterPayload,
  FindUserBySessionArgs,
  FindUserBySessionPayload,
} from "../../../graphql/auth/types"; // alias
import { LOGIN, REGISTER, FIND_USER_BY_SESSION } from "../../../../lib/docs"; // alias please

export const register = async (
  data: RegisterArgs
): Promise<RegisterPayload> => {
  try {
    const { register: newUser }: { register: RegisterPayload } =
      await client.request(REGISTER, {
        data,
      });
    return newUser;
  } catch (e) {
    return e;
  }
};

export const login = async (data: LoginArgs): Promise<LoginPayload> => {
  try {
    const { login: user }: { login: LoginPayload } = await client.request(
      LOGIN,
      {
        data,
      }
    );
    return user;
  } catch (e) {
    return e;
  }
};

export const findUserBySession = async ({
  token,
}: {
  token: string;
}): Promise<FindUserBySessionPayload> => {
  try {
    const {
      findUserBySession: user,
    }: { findUserBySession: FindUserBySessionPayload } = await client.request(
      FIND_USER_BY_SESSION,
      {
        Headers: { Authorization: `Bearer ${token}` },
      }
    );

    return user;
  } catch (e) {
    return e;
  }
};
