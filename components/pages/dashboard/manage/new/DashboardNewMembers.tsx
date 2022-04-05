import { useQuery } from "@apollo/client";
import React from "react";
import { useAuthContext, useToastContext } from "../../../../../context";
import { GET_CLUB_INVITES } from "../../../../../lib/docs";
import type {
  GetClubInvitesArgs,
  GetClubInvitesPayload,
} from "../../../../../server/graphql/club/types";
import {
  DashboardMembers as Members,
  DashboardAddMemberModal,
} from "../shared";

export const DashboardNewMembers = () => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const { loading, error, data } = useQuery<
    { getClubInvites: GetClubInvitesPayload },
    GetClubInvitesArgs
  >(GET_CLUB_INVITES, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    variables: {
      clubId: "cl12yw8sj0026x9pck6j4zgoe",
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
      <DashboardAddMemberModal members={members} />
      <Members members={members} />
    </div>
  );
};
