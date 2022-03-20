import React, { useEffect, useState } from "react";
import { ModalProvider, useModalContext } from "../../../../general/Modal";

import { BsCheckCircleFill } from "react-icons/bs";

export const AdminAccountsApproveModal = ({ reject, selectedRowIds }) => {
  const rowsLength = Object.keys(selectedRowIds).length;
  return (
    <div>
      <ModalProvider closeColor={{ color: "#ffffff", index: 2 }}>
        <OpenModal reject={reject} rowsLength={rowsLength} />
        <ConfirmationModal reject={reject} rowsLength={rowsLength} />
        <CongratsModal reject={reject} rowsLength={rowsLength} />
      </ModalProvider>
    </div>
  );
};

const OpenModal = ({ reject, rowsLength }) => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      disabled={!rowsLength}
      className={`${
        rowsLength
          ? reject
            ? "bg-red-500 hover:bg-[#e63939]"
            : "bg-cc hover:bg-[#1d58e2]"
          : reject
          ? "bg-red-500/20"
          : "bg-cc/20"
      } rounded-lg px-8 py-1 font-semibold text-white duration-150`}>
      {reject ? "Reject" : "Approve"} ({rowsLength})
    </button>
  );
};

const ConfirmationModal = ({ reject, rowsLength }) => {
  const { closeModal, next } = useModalContext();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl font-semibold">Are you sure?</h4>
      <p className="text-lg text-ccGreyLight">
        You are about to {reject ? "reject" : "approve"}
        <span
          className={`font-semibold ${reject ? "text-red-500" : "text-cc"}`}>
          {" "}
          {rowsLength} selected
        </span>{" "}
        accounts.{" "}
        {reject
          ? "This will restrict their ability to join clubs."
          : "This action will allow these users to join clubs."}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={closeModal}
          className="rounded-lg bg-gray-200 py-2 font-semibold duration-150 hover:bg-[#dbdde0]">
          Cancel
        </button>
        {reject ? (
          <button
            onClick={next}
            className="rounded-lg bg-red-500 py-2 font-semibold text-white duration-150 hover:bg-[#e63939]">
            Reject
          </button>
        ) : (
          <button
            onClick={next}
            className="rounded-lg bg-cc py-2 font-semibold text-white duration-150 hover:bg-[#1d58e2]">
            Approve
          </button>
        )}
      </div>
    </div>
  );
};

const CongratsModal = ({ reject, rowsLength }) => {
  const { closeModal } = useModalContext();

  return (
    <div>
      <div
        className={`flex h-[90px] w-[112%] -translate-x-[24px] -translate-y-[24px] items-center  justify-center bg-gradient-to-r ${
          reject ? "from-[#ff6c6c] to-[#FF5555]" : "from-cc/80 to-cc"
        }`}>
        <BsCheckCircleFill className="text-5xl text-white" />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl font-semibold">
          Successfully {reject ? "rejected" : "approved"} {rowsLength} accounts.
        </h4>
        <p className="text-lg text-ccGreyLight">
          {rowsLength} accounts have been {reject ? "rejected" : "approved"}.{" "}
          {reject
            ? "They will not be able to join clubs."
            : "They will now be able to join clubs."}
        </p>
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="w-full rounded-lg bg-gray-200 py-2 font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
