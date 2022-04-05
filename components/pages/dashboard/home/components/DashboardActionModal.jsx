import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuthContext, useToastContext } from "../../../../../context";
import { LEAVE_CLUB } from "../../../../../lib/docs";
import { CustomTitle } from "../../../../general/CustomTitle";
import { ModalProvider, useModalContext } from "../../../../general/Modal";

export const DashboardActionModal = ({ club, refetch }) => {
  return (
    <ModalProvider>
      <OpenModal />
      <ActionPage clubId={club.id} clubName={club.name} />
      <Congrats clubName={club.name} refetch={refetch} />
    </ModalProvider>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 px-6 py-1 text-gray-600 duration-75 hover:bg-gray-200">
      <HiOutlineLogout />
      Leave
    </button>
  );
};

const ActionPage = ({ clubId, clubName, refetch }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const { closeModal, next } = useModalContext();

  const [leaveClub, { loading }] = useMutation(LEAVE_CLUB, {
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
    variables: {
      clubId,
    },
    onCompleted: (data) => {
      console.log(data);
      next();
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "An error has occurred",
        message: "Unable to leave club at this time. Please try again later.",
        duration: 5000,
      });
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="flex flex-col gap-4">
      <HiOutlineLogout className="text-4xl" />
      <CustomTitle
        title="Confirm leaving club?"
        subtitle={`Are you sure you want to leave ${clubName}? This will remove you from the club's roster.`}
      />
      <div className="grid w-full grid-cols-2 gap-2">
        <button
          onClick={closeModal}
          className="rounded-md bg-gray-200 py-2 px-4 text-gray-600">
          Cancel
        </button>
        <button
          onClick={leaveClub}
          className=" rounded-md bg-red-500 py-2 px-4 text-white">
          {loading ? (
            <span className="flex flex-row items-center justify-center gap-2">
              <CgSpinner className="animate-spin" /> Leaving...
            </span>
          ) : (
            "Leave"
          )}
        </button>
      </div>
    </div>
  );
};

const Congrats = ({ clubName, refetch }) => {
  const { closeModal, isOpen } = useModalContext();
  useEffect(() => {
    const f = async () => {
      if (!isOpen) await refetch();
    };
    f();
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-4">
      <BsCheck className="text-5xl" />
      <CustomTitle
        title={`Successfully left club`}
        subtitle={`You will no longer be a part of ${clubName}.`}
      />
      <button
        onClick={closeModal}
        className="w-full rounded-md bg-gray-200 py-2 text-gray-600">
        Close
      </button>
    </div>
  );
};
