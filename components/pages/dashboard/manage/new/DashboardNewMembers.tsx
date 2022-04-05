import { useQuery } from "@apollo/client";
import React from "react";
import { useAuthContext, useToastContext } from "../../../../../context";
import { GET_CLUB_INVITES } from "../../../../../lib/docs";
import type {
  GetClubInvitesArgs,
  GetClubInvitesPayload,
} from "../../../../../server/graphql/club/types";
import { usePaginationContext } from "../components";
import {
  DashboardMembers as Members,
  DashboardAddMemberModal,
} from "../shared";
import { useManagementContext } from "../context";

export const DashboardNewMembers = () => {
  const { user } = useAuthContext();
  const { next, prev } = usePaginationContext();
  const { addToast } = useToastContext();
  const { clubId } = useManagementContext();

  const { loading, error, data, refetch } = useQuery<
    { getClubInvites: GetClubInvitesPayload },
    GetClubInvitesArgs
  >(GET_CLUB_INVITES, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    variables: {
      clubId,
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "An error occurred.",
        message:
          "There was a problem fetching the members, please try again later.",
        duration: 5000,
      });
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error has occurred fetching your clubs invites. Please try again
        later.
      </div>
    );

  const members = data?.getClubInvites || [];

  return (
    <div className="flex flex-col items-start gap-2">
      <DashboardAddMemberModal members={members} refetch={refetch} />
      <Members members={members} refetch={refetch} />
      <div className="mt-3 grid w-[380px] grid-cols-2 items-center gap-3">
        <button
          onClick={() => prev()}
          className="rounded-md bg-gray-100 px-9 py-2 duration-100 hover:bg-gray-200"
        >
          Back
        </button>
        <button
          onClick={() => next()}
          className="rounded-md bg-cc px-9 py-2 text-white duration-100 hover:bg-ccDark"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
