import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import Link from "next/link";
import {
  DashboardSummaryBasic,
  DashboardSummaryLinks,
  DashboardSummaryMembers,
} from "../components";
import { GET_CLUB_DRAFT_SUMMARY } from "../../../../../lib/docs";
import { ModalProvider, useModalContext } from "../../../../general/Modal";
import { CgSpinner } from "react-icons/cg";
import { useManagementContext } from "../context";
import { CustomTitle } from "../../../../general/CustomTitle";
import { useAuthContext } from "../../../../../context";

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
          <ModalCongrats />
        </ModalProvider>
      </div>
    </div>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return (
    <button onClick={openModal} className="rounded-md bg-cc py-2 text-white">
      Submit
    </button>
  );
};

const ActionModal = () => {
  const { user } = useAuthContext();
  const { closeModal, next } = useModalContext();
  const { sendClubForApproval, isLoading, clubId } = useManagementContext();

  const handleSubmit = () => {
    sendClubForApproval({
      context: {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      },
      variables: {
        clubId,
      },
    });
    next();
  };

  return (
    <div className="flex flex-col gap-4">
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
          className="rounded-md bg-[#201C27] py-2 text-gray-100 duration-100 hover:bg-black">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <CgSpinner />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

const ModalCongrats = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const config = {
    angle: 90,
    spread: 150,
    startVelocity: 40,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 3300,
    stagger: 5,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex -translate-y-10 justify-center">
        <Confetti active={active} config={config} />
      </div>
      <CustomTitle
        title="Success!"
        subtitle="Successfully submitted your club for ASB approval. Once ASB approves your club it will appear on Club Compass. You can always go back and edit your club after it has been approved."
      />
      <div className="flex w-full">
        <Link href="/dashboard">
          <a className="w-full rounded-md bg-gray-100 py-2 text-center text-gray-600 duration-100 hover:bg-gray-200">
            Close
          </a>
        </Link>
      </div>
    </div>
  );
};
