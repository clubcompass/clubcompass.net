import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../../context";
import { db } from "../../../../lib/database";
// import { Clubs } from "../../clubs"; //! use club component?
import { Loading } from "../../../general/Loading";
import { CopyText } from "../../../general/CopyText";
import { Clubs } from "../../clubs/Clubs";

export const DashboardUserClubs = () => {
  const { user } = useAuthContext();

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-12 gap-2">
        Your ccId: <CopyText className="font-bold">{user.ccid}</CopyText>
      </div>
      <h2 className="text-lg font-semibold">Your Clubs</h2>
      <Clubs dashboard clubs={user.clubs} />
    </div>
  );
};
