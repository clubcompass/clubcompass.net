import { useQuery } from "@apollo/client";
import React from "react";
import {
  DashboardSummaryBasic,
  DashboardSummaryLinks,
  DashboardSummaryMembers,
} from "../components";
import { GET_CLUB_DRAFT_SUMMARY } from "../../../../../lib/docs";
import { ModalProvider, useModalContext } from "../../../../general/Modal";
import { CgSpinner } from "react-icons/cg";
import { useManagementContext } from "../context";

export const DashboardNewSummary = () => {
  const { clubId, sendClubForApproval } = useManagementContext();
  const {
    data: { getClubDraftSummary: draftSummary } = {},
    loading: summaryLoading,
    error: summaryError,
  } = useQuery(GET_CLUB_DRAFT_SUMMARY, {
    variables: {
      clubId,
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
      <div className="mt-3 grid w-[380px] grid-cols-2 items-center gap-3">
        <button
          onClick={() => prev()}
          className="rounded-md bg-gray-100 px-9 py-2 duration-100 hover:bg-gray-200">
          Back
        </button>
        <ModalProvider>
          <OpenModal />
          <ActionModal />
          <OpenModal />
        </ModalProvider>
      </div>
    </div>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return <button onClick={openModal}>Open</button>;
};

const ActionModal = () => {
  const { closeModal, next } = useModalContext();

  const handleSubmit = () => {
    // submit club
    next();
  };
  return (
    <div>
      <CustomTitle
        title="Submit for Approval?"
        subtitle="Are you sure you want to submit your draft for approval? You will not be able to edit your club until it is out of review."
      />
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={closeModal}
          className="rounded-md bg-gray-100 py-2 text-gray-600 duration-100 hover:bg-gray-200">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#201C27] py-2 text-gray-100 duration-100 hover:bg-black">
          Submit
        </button>
      </div>
    </div>
  );
};
