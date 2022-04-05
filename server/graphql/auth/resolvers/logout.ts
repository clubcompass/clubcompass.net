import { Context } from "../../ctx";

export interface LogoutArgs {}

export type LogoutPayload = Awaited<ReturnType<typeof logout>>;

export const logout = async (
  _parent: any,
  _: LogoutArgs,
  { auth: token, setCookie }: Context
): Promise<boolean> => {
  setCookie({
    name: "token",
    value: "",
    options: {
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    },
  });

  return true;

  //   return user
};
