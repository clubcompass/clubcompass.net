import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, REGISTER, FIND_USER_BY_SESSION } from "../lib/docs"; //CHANGE THIS
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, protectedRoute }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(loading, user);

  const [register, { login: registerLoading }] = useMutation(REGISTER, {
    onCompleted: ({ register: { user, token } }) => {
      console.log(user, token);
      // console.log(data);
      // setUser(data.register);
      // router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted({ login: user }) {
      setUser(user);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [findUserBySession, { loading: sessionUserLoading }] = useLazyQuery(
    FIND_USER_BY_SESSION,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleRegister = async (user) => {
    try {
      const {
        data: {
          register: { token },
        },
      } = await register({ variables: { data: { ...user } } });
      Cookies.set("token", token);
      return token;
      // return router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (user) => {
    try {
      const {
        data: {
          login: { token },
        },
      } = await login({ variables: { data: { ...user } } });
      Cookies.set("token", token);
      return router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    setLoading(true);
    if (!user) {
      const token = Cookies.get("token");
      if (token) {
        (async () => {
          const {
            data: { findUserBySession: user },
          } = await findUserBySession({
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          });
          console.log("user from session:", user);
          setUser(user);
        })();
      } else {
        setUser(null);
      }
    }
    setLoading(false);
  }, [findUserBySession, user]);

  useEffect(() => {
    if (protectedRoute) {
      const token = Cookies.get("token");
      if (token && !user) {
        // USER DOESN'T FUCKING UPDATE
        return;
      } else {
        console.log("redirecting to login");
        router && router.push("/login");
      }
    }
  }, [protectedRoute, user, router]);

  const value = {
    login: async (user) => await handleLogin(user),
    logout: () => {
      logout();
      setUser(null);
    },
    register: async (user) => await handleRegister(user),
    user,
    loading: loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Auth loading...</div>}
      {/* {!loading && children} */}
    </AuthContext.Provider>
  );
};
