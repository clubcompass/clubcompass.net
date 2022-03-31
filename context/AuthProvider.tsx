import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useMutation, MutationFunction, FetchResult } from "@apollo/client";
import { LOGIN, REGISTER, LOGOUT } from "../lib/docs"; //CHANGE THIS
import { useRouter } from "next/router";
import {
  FindUserBySessionPayload as AuthenticatedUser,
  LoginArgs,
  LoginPayload,
  LogoutPayload,
  RegisterArgs,
  RegisterPayload,
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
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(initialUser);

  const [login] = useMutation<{ login: LoginPayload }, LoginArgs>(LOGIN, {
    onCompleted: async ({ login: user }) => {
      setUser(user); // should be same result as currentUser
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

  const [register] = useMutation<{ register: RegisterPayload }, RegisterArgs>(
    REGISTER,
    {
      onCompleted: async ({ register: user }) => {
        setUser(user); // should be same result as currentUser
        await router.push("/clubs"); // shouldn't redirect...
      },
      onError(error) {
        console.log(error);
        // addToast({
        //   type: "error",
        //   title: "Register failed",
        //   message: error.message,
        // });
      },
    }
  );

  const [logout] = useMutation<{ logout: LogoutPayload }>(LOGOUT, {
    onCompleted: async () => {
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
