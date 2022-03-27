import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { User } from "@prisma/client";
import Cookies from "js-cookie";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, REGISTER, FIND_USER_BY_SESSION } from "../lib/docs"; //CHANGE THIS
import { useRouter } from "next/router";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

interface AuthContext {
  user: AuthenticatedUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthenticatedUser
  extends Pick<
    User,
    | "active"
    | "ccid"
    | "id"
    | "email"
    | "emailVerified"
    | "firstname"
    | "lastname"
  > {
  __typename: "SessionUser";
  pendingInvites: number;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuthContext = (): AuthContext => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, protectedRoute }) => {
  const router = useRouter();
  // const { addToast } = useToastContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [findUserBySession, { loading: sessionUserLoading }] = useLazyQuery(
    FIND_USER_BY_SESSION,
    {
      onCompleted: ({ findUserBySession: user = {} } = {}) => {
        // onCompleted: (data) => {
        // console.log(data);
        console.log("findUserBySession", user);
        setUser(user);
      },
      onError: (error) => {
        console.log(error);
        console.log("removing token");
        // Cookies.remove("token");
      },
    }
  );

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted: async ({ login: { user, token } }) => {
      // console.log(token);
      console.log(user);
      // await findUserBySession({
      //   context: { headers: { authorization: `Bearer ${token}` } },
      // });

      // Cookies.set("token", token);
      // router.push("/dashboard"); // doesn't update?
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

  // const handleRegister = async (user) => {
  //   try {
  //     const {
  //       data: {
  //         register: { token },
  //       },
  //     } = await register({ variables: { data: { ...user } } });
  //     Cookies.set("token", token);
  //     return token;
  //   } catch (e) {
  //     console.log(e);
  //     // if (graphQLErrors) {
  //     //   graphQLErrors.forEach(({ message }) => console.log(message));
  //     // }

  //     // if (networkError) {
  //     //   // global handler for graphql errors
  //     //   console.log(networkError);
  //     // }
  //     // console.log(error);
  //   }
  // };

  const handleLogin = useCallback(
    async (user) => {
      try {
        await login({ variables: { data: { ...user } } });
      } catch (error) {
        console.log(error);
      }
    },
    [login]
  );

  // const authorize = async () => {
  //   try {
  //     const {
  //       data: { user },
  //     } = await axios.get("/api/auth/authorize", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  //       },
  //     });
  //     setUser(user);
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   authorize();
  // }, []);

  // const handleLogin = async ({ user }) => {
  //   const { user: responseUser, error } = await login({ user });
  //   if (error) {
  //     return { error };
  //   }
  //   await authorize();
  //   return { user: responseUser, error };
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   if (!user) {
  //     const token = Cookies.get("token");
  //     if (token) {
  //       (async () => {
  //         try {
  //           const {
  //             data: { findUserBySession: user },
  //           } = await findUserBySession({
  //             context: {
  //               headers: {
  //                 authorization: `Bearer ${token}`,
  //               },
  //             },
  //           });
  //           console.log("user from session:", user);
  //           setUser(user);
  //         } catch (error) {
  //           Cookies.remove("token");
  //           console.log(error);
  //         }
  //       })();
  //     } else {
  //       setUser(null);
  //     }
  //   }
  //   setLoading(false);
  // }, [findUserBySession, user]);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      const token = Cookies.get("token");
      console.log("token:", token);
      if (token) {
        (async () => {
          await findUserBySession({
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          });
        })();
      } else {
        setUser(null);
      }
    }
    setLoading(false);
  }, [findUserBySession, user]);

  // useEffect(() => {
  //   if (protectedRoute) {
  //     const token = Cookies.get("token");
  //     if (token && !user) {
  //       // USER DOESN'T FUCKING UPDATE
  //       return;
  //     } else {
  //       console.log("redirecting to login");
  //       router && router.push("/login");
  //     }
  //   }
  // }, [protectedRoute, user, router]);

  const value = useMemo(
    () => ({
      login: async (user) => await handleLogin(user),
      logout: () => {
        // Cookies.remove("token");
      },
      // register: async (user) => await handleRegister(user),
      user,
      loading: loading || sessionUserLoading,
    }),
    [user, loading, sessionUserLoading, handleLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// event listener to check for cookie, if it exists, then check if user is logged in, if not, redirect to login

// export async function getServerSideProps() {
//   const apolloClient = initializeApollo();

//   // await apolloClient.query({
//   //   query: ALL_POSTS_QUERY,
//   //   variables: allPostsQueryVars,
//   // })

//   return addApolloState(apolloClient, {
//     props: {},
//   });
// }
