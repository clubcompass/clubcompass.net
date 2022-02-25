import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const logout = async () => {
    const r = await axios.get("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
        secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
      },
    });
    await authorize();
  };

  const authorize = useCallback(async () => {
    try {
      const { status, data } = await axios.get("/api/auth/authorize", {
        headers: {
          "Content-Type": "application/json",
          secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
        },
      });
      console.log(status);
      if (status !== 200) {
        router.push("login");
      }
      const user = data.data;
      setUser(user);
    } catch (e) {
      router.push("login");
    }
  }, [router]);

  useEffect(async () => {
    await authorize();
  }, [authorize, router]);

  return (
    <div>
      {user && <p>Email: {user.email}</p>}
      <button
        className="bg-black px-2 py-1 text-white rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
