import React, { createContext, useContext, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useMutation, FetchResult, useLazyQuery } from "@apollo/client";
import { useToastContext } from "../context";
import { LOGIN, REGISTER, LOGOUT, SEND_VERIFICATION_EMAIL } from "../lib/docs"; //CHANGE THIS
import {
  FindUserBySessionPayload as AuthenticatedUser,
  LoginArgs,
  LoginPayload,
  LogoutPayload,
  RegisterArgs,
  RegisterPayload,
  SendVerificationEmailArgs,
  SendVerificationEmailPayload,
} from "../server/graphql/auth/types";

interface AuthContext {
  user: AuthenticatedUser | null;
  login?: ({
    user,
  }: {
    user: LoginArgs["data"];
  }) => Promise<FetchResult<{ login: LoginPayload }>>;
  register?: ({
    user,
  }: {
    user: RegisterArgs["data"];
  }) => Promise<FetchResult<{ register: RegisterPayload }>>;
  logout?: () => Promise<FetchResult<{ logout: LogoutPayload }>>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  // login: async () => {},
  // register: async () => {},
  // logout: async () => {},
});

export const useAuthContext = (): AuthContext => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ user: initialUser, children }) => {
  const { addToast } = useToastContext();
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(initialUser);

  const [login] = useMutation<{ login: LoginPayload }, LoginArgs>(LOGIN, {
    onCompleted: async ({ login: user }) => {
      setUser(user); // should be same result as currentUser
      addToast({
        type: "info",
        title: `Welcome back ${user.firstname} ${user.lastname}`,
        message: "You have successfully logged in. Welcome back!",
        duration: 5000,
      });
      await router.push("/dashboard");
    },
    onError(error) {
      console.log(error);
      // addToast({
      //   type: "error",
      //   title: "Login failed",
      //   message: error.message,
      // });
    },
  });

  const [sendVerificationCode] = useLazyQuery<
    { sendVerificationEmail: SendVerificationEmailPayload },
    SendVerificationEmailArgs
  >(SEND_VERIFICATION_EMAIL, {
    onCompleted: async () => {
      addToast({
        type: "info",
        title: `Verification code sent to ${user?.email}`,
        message: "Please check your email and verify your account",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "Verification code failed",
        message: error.message,
        duration: 5000,
      });
    },
  });

  const [register] = useMutation<{ register: RegisterPayload }, RegisterArgs>(
    REGISTER,
    {
      onCompleted: async ({ register: user }) => {
        setUser(user); // should be same result as currentUser
        await sendVerificationCode({
          variables: {
            email: user.email,
          },
          context: {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          },
        });
        addToast({
          type: "info",
          title: "Registration successful",
          message:
            "Before you can login, you need to confirm your email and be activated by ASB.",
          duration: 5000,
        });
        // end
        // await router.push("/clubs"); // shouldn't redirect...
      },
      onError(error) {
        console.log(error);
        addToast({
          type: "error",
          title: "Register failed",
          message: error.message,
        });
      },
    }
  );

  const [logout] = useMutation<{ logout: LogoutPayload }>(LOGOUT, {
    onCompleted: async () => {
      addToast({
        type: "info",
        title: "Logged out",
        message: "You have been logged out from club compass.",
        duration: 3000,
      });
      await router.push("/");
      setUser(null);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const value = useMemo(
    () => ({
      login: async ({ user }: { user: LoginArgs["data"] }) =>
        await login({ variables: { data: { ...user } } }),
      logout: async () => await logout(),
      register: async ({ user }: { user: RegisterArgs["data"] }) =>
        await register({ variables: { data: { ...user } } }),
      user,
    }),
    [user, logout, login, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// event listener to check for cookie, if it exists, then check if user is logged in, if not, redirect to login
