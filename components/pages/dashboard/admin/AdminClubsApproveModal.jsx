import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ModalProvider, useModalContext } from "../../../general/Modal";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { APPROVE_CLUB, DECLINE_CLUB } from "../../../../lib/docs";
import { CgSpinner } from "react-icons/cg";

export const AdminClubsApproveModal = ({
  reject,
  name,
  clubId,
  email,
  reviewed,
  refetch,
}) => {
  // if (reviewed) return null;

  return (
    <ModalProvider closeColor={{ color: "#ffffff", index: 2 }}>
      {!reviewed && <OpenModal reject={reject} />}
      <ConfirmationModal
        reject={reject}
        name={name}
        clubId={clubId}
        refetch={refetch}
      />
      <CongratsModal reject={reject} name={name} email={email} />
    </ModalProvider>
  );
};

const OpenModal = ({ reject }) => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className={`${
        reject ? "bg-red-500 hover:bg-[#e63939]" : "bg-cc hover:bg-[#1d58e2]"
      } rounded-lg px-8 py-1 font-semibold text-white duration-150`}
    >
      {reject ? (
        <span className="flex items-center gap-2">
          <BsXLg /> Reject
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <BsCheckLg /> Approve
        </span>
      )}
    </button>
  );
};

const ConfirmationModal = ({ reject, name, clubId, refetch }) => {
  const { closeModal, next } = useModalContext();
  const [approvedClub, { loading: approvalLoading }] = useMutation(
    APPROVE_CLUB,
    {
      variables: {
        clubId,
      },
      onCompleted: () => {
        console.log("approved!");
        refetch();
        next();
      },
      onError: (error) => {
        console.log(error);
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [declineClub, { loading: denialLoading }] = useMutation(DECLINE_CLUB, {
    variables: {
      clubId,
    },
    onCompleted: () => {
      console.log("declined!");
      refetch();
      next();
    },
    onError: (error) => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleConfirmation = async () => {
    if (reject) {
      return await declineClub();
    }
    return await approvedClub();
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl font-semibold">Are you sure?</h4>
      <p className="text-lg text-ccGreyLight">
        You are about to {reject ? "decline" : "approve"}{" "}
        <span
          className={`font-semibold ${reject ? "text-red-500" : "text-cc"}`}
        >
          {name}.
        </span>{" "}
        {reject
          ? "This will send the club back to the creator for changes to be made."
          : "This action will publish the club onto Club Compass."}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={closeModal}
          className="rounded-lg bg-gray-200 py-2 font-semibold duration-150 hover:bg-[#dbdde0]"
        >
          Cancel
        </button>
        {reject ? (
          <button
            onClick={handleConfirmation}
            disabled={denialLoading}
            className={`${
              denialLoading
                ? " cursor-not-allowed bg-opacity-20"
                : "hover:bg-[#e63939]"
            } rounded-lg bg-red-500 py-2 font-semibold text-white duration-150`}
          >
            {denialLoading ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <CgSpinner size={15} className="animate-spin" />
                <span>Declining...</span>
              </div>
            ) : (
              <span>Decline</span>
            )}
          </button>
        ) : (
          <button
            onClick={handleConfirmation}
            disabled={approvalLoading}
            className={`${
              approvalLoading
                ? "cursor-not-allowed bg-opacity-20"
                : "hover:bg-[#1d58e2]"
            } rounded-lg bg-cc py-2 font-semibold text-white duration-150`}
          >
            {approvalLoading ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <CgSpinner size={15} className="animate-spin" />
                <span>Approving...</span>
              </div>
            ) : (
              <span>Approve</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const CongratsModal = ({ reject, name, clubId, email }) => {
  const { closeModal } = useModalContext();

  return (
    <div>
      <div
        className={`flex h-[90px] w-[112%] -translate-x-[24px] -translate-y-[24px] items-center  justify-center bg-gradient-to-r ${
          reject ? "from-[#ff6c6c] to-[#FF5555]" : "from-cc/80 to-cc"
        }`}
      >
        <BsCheckCircleFill className="text-5xl text-white" />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl font-semibold">
          Successfully {reject ? "declined" : "approved"} {name}.
        </h4>
        <p className="text-lg text-ccGreyLight">
          This club will {reject ? "not appear" : "now appear"} on the clubs
          page.{" "}
          {reject
            ? "Make sure to contact the creator to inform them why their club was declined."
            : "You can still manage this club in the manage clubs tab."}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={closeModal}
            className="rounded-lg bg-gray-200 py-2 font-semibold"
          >
            Close
          </button>
          {reject ? (
            <a
              // onClick={closeModal}
              href={`mailto:${email}`}
              className="rounded-lg bg-red-500 py-2 text-center font-semibold text-white"
            >
              Contact creator
            </a>
          ) : (
            <Link href="/admin/manage">
              <a className="rounded-lg bg-cc py-2 text-center font-semibold text-white">
                Manage
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
