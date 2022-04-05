import { useQuery } from "@apollo/client";
import React from "react";
import {
  DashboardSummaryBasic,
  DashboardSummaryLinks,
  DashboardSummaryMembers,
} from "../components";
import { GET_CLUB_DRAFT_SUMMARY } from "../../../../../lib/docs";
import { CgSpinner } from "react-icons/cg";

export const DashboardNewSummary = () => {
  const {
    data: { getClubDraftSummary: draftSummary } = {},
    loading: summaryLoading,
    error: summaryError,
  } = useQuery(GET_CLUB_DRAFT_SUMMARY, {
    variables: {
      clubId: "cl1lcixvu0026ezv5w9vorzqr",
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (summaryLoading)
    return (
      <span>
        <CgSpinner className="animate-spin" /> Loading summary...
      </span>
    );
  if (summaryError)
    return (
      <p>
        An unexpected error occurred when fetching your summary. Try again
        later.
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      <DashboardSummaryBasic club={draftSummary} />
      <DashboardSummaryMembers club={draftSummary} />
      <DashboardSummaryLinks links={draftSummary.links} />
    </div>
  );
};
