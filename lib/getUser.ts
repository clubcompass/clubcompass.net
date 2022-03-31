import { verify } from "jsonwebtoken";
import { initializeApollo } from "./apolloClient";
import { FIND_USER_BY_SESSION } from "./docs";
import { FindUserBySessionPayload } from "../server/graphql/auth/types";

export type AuthenticatedUser = FindUserBySessionPayload & { token: string };

export const getUser = async ({
  cookies,
}): Promise<AuthenticatedUser | null> => {
  if (!cookies?.token) return null;
  if (cookies?.token) {
    const client = initializeApollo();
    const token = cookies.token;

    try {
      verify(token, process.env.SECRET);
      const {
        data: { findUserBySession: user },
      } = await client.query<{ findUserBySession: FindUserBySessionPayload }>({
        query: FIND_USER_BY_SESSION,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
