import React from "react";
import { useAuthContext } from "../../../../context";
import { db } from "../../../../lib/database";
import { Loading } from "../../../general/Loading";
import { DashboardHeader } from "./DashboardHeader";
import { Clubs } from "../../clubs/Clubs";
import Link from "next/link";
import { CCIcon } from "../../../custom/cc";

export const DashboardUserClubs = () => {
  const { user } = useAuthContext();

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader name={user.firstname} ccid={user.ccid} />
      {!user.clubs && (
        <div className="flex flex-col gap-4 mt-[20vh] items-center align-center">
          <div className="h-[75px] w-[75px]">
            <CCIcon color="cc" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-bold">
              Looks like you haven't signed up for any clubs yet!
            </p>
            <p className="text-lg">
              Once you sign up, your clubs will appear here
            </p>
            <Link href="/clubs">
              <a className="text-cc text-xl font-bold mt-2">
                Discover some &rarr;
              </a>
            </Link>
          </div>
        </div>
      )}
      <Clubs clubs={user.clubs} />
      {user.clubs && (
        <div className="flex mt-4 justify-center">
          <Link href="/clubs">
            <a className="text-cc">Discover more &rarr;</a>
          </Link>
        </div>
      )}
    </div>
  );
};
