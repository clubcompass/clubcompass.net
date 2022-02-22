import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context";
import { DashboardNav } from "./navigation";
export const DashboardNavigationLayout = ({ children }) => {
  const { user } = useAuthContext();
  console.log(user);
  // TODO: This doesn't work?
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  return (
    <Container>
      <DashboardNav />
      <div className="p-6 w-full ml-[360px]">{children}</div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex flex-row w-full">{children}</div>
);
