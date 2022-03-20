import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsTrashFill } from "react-icons/bs";
import { ModalProvider, useModalContext } from "../../../general/Modal";

export const AdminDeleteModal = ({ deleting, value }) => {
  return (
    <div>
      <ModalProvider closeColor={{ color: "#ffffff", index: 2 }}>
        <OpenModal deleting={deleting} />
        <ConfirmationModal value={value} />
        <CongratsModal value={value} />
      </ModalProvider>
    </div>
  );
};

const OpenModal = ({ deleting }) => {
  const { openModal } = useModalContext();
  return (
    <button onClick={openModal} disabled={!deleting} className="">
      <BsTrashFill className={deleting ? "text-red-500" : "text-gray-300"} />
    </button>
  );
};

const ConfirmationModal = ({ value }) => {
  const { closeModal, next } = useModalContext();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl font-semibold">Confirm deleting {value.name}?</h4>
      <div>
        <p className="text-lg text-ccGreyLight">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-500">{value.name}</span>
          {value.type === "CLUB" && (
            <span>
              , a club with{" "}
              <span className="font-semibold text-red-500">
                {value.members} members
              </span>
            </span>
          )}
          ? This action can not be reversed.
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <button
          onClick={closeModal}
          className="rounded-lg bg-gray-200 py-2 font-semibold duration-150 hover:bg-[#dbdde0]">
          Cancel
        </button>
        <button
          onClick={next}
          className="rounded-lg bg-red-500 py-2 font-semibold text-white duration-150 hover:bg-[#e63939]">
          Delete
        </button>
      </div>
    </div>
  );
};

const CongratsModal = ({ value }) => {
  const { closeModal } = useModalContext();

  return (
    <div>
      <div className="flex h-[90px] w-[112%] -translate-x-[24px] -translate-y-[24px] items-center  justify-center bg-gradient-to-r from-[#ff6c6c] to-[#FF5555]">
        <BsCheckCircleFill className="text-5xl text-white" />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl font-semibold">
          Successfully deleted {value.name}
        </h4>
        <p className="text-lg text-ccGreyLight">
          You have successfully deleted {value.name}.{" "}
          {value.type === "CLUB" ? "It" : "They"} will no longer be a part of
          Club Compass.
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
