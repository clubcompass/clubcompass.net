import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context";
const Dashboard = () => {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

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
