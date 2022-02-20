import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { login, logout, register } from "../lib/auth";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authorize = async () => {
    try {
      const {
        data: { user },
      } = await axios.get("/api/auth/authorize", {
        headers: {
          "Content-Type": "application/json",
          secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
        },
      });
      setUser(user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  const handleLogin = async ({ user }) => {
    const { user: responseUser, error } = await login({ user });
    if (error) {
      return { error };
    }
    await authorize();
    return { user: responseUser, error };
  };

  const value = {
    login: async ({ user }) => await handleLogin({ user }),
    logout: () => {
      logout();
      setUser(null);
    },
    register: ({ data }) => register({ data }),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
