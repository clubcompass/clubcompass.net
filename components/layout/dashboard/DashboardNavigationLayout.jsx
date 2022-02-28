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
      <div className="bg-[#FAFAFA] py-6 w-full pl-[280px] pr-[30px]">
        {children}
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex flex-row w-full">{children}</div>
);
