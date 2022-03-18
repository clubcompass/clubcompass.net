import React from "react";
import Link from "next/link";
import { GET_USER_CLUBS } from "../../../../lib/docs";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../../../../context";
import { Loading } from "../../../general/Loading";
import { DashboardHeader } from "./DashboardHeader";
import { Clubs } from "../../clubs/Clubs";
import { CCIcon } from "../../../custom/cc";

export const DashboardUserClubs = () => {
  const { user, loading } = useAuthContext();
  const { data: { getUserClubs: clubs } = {}, loading: loadingClubs } =
    useQuery(GET_USER_CLUBS, {
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiY2NpZCI6IlNNQ1NLTyIsImVtYWlsIjoicGF1bC5ib2tlbG1hbjFAZ21haWwuY29tIiwiaWF0IjoxNjQ3NDc2NjkwLCJleHAiOjE2NDc3MzU4OTB9.yiArSA_88Wp4VRsvqWB0hVpXrKJGCsRAolD63CKP-DM`,
        },
      },
    });

  if (!user && loading) return <Loading />;
  if (!clubs && loadingClubs) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader name={user?.firstname} ccid={user?.ccid} />
      {clubs.length === 0 && (
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
      <Clubs clubs={clubs} />
      {!clubs && (
        <div className="flex mt-4 justify-center">
          <Link href="/clubs">
            <a className="text-cc">Discover more &rarr;</a>
          </Link>
        </div>
      )}
    </div>
  );
};
