import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();

    // Redirects the user to Login page
    router.push("/login");
  }

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div>
      {/* Change it to display the user ID too 👇*/}
      <p>Welcome, {user?.id}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
