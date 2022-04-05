import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  BATCH_APPROVE_USERS,
  BATCH_DELETE_USERS,
} from "../../../../../lib/docs";
import { ModalProvider, useModalContext } from "../../../../general/Modal";

import { BsCheckCircleFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useAuthContext, useToastContext } from "../../../../../context";

export const AdminAccountsApproveModal = ({
  reject,
  selectedRowIds,
  selected = [],
  refetch,
}) => {
  const [deleted, setDeleted] = useState([]);
  const rowsLength = Object.keys(selectedRowIds).length;
  const userIds = selected.map((user) => user.id);

  return (
    <div>
      <ModalProvider closeColor={{ color: "#ffffff", index: 2 }}>
        <OpenModal reject={reject} rowsLength={rowsLength} />
        <ConfirmationModal
          reject={reject}
          setNumberOfDeleted={setDeleted}
          rowsLength={rowsLength}
          userIds={userIds}
          refetch={refetch}
        />
        <CongratsModal reject={reject} deleted={deleted} />
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

const ConfirmationModal = ({
  reject,
  rowsLength,
  userIds,
  refetch,
  setNumberOfDeleted,
}) => {
  const { user } = useAuthContext();
  const { closeModal, next } = useModalContext();
  const { addToast } = useToastContext();

  const [batchApproveUsers, { loading: approveUsersLoading }] = useMutation(
    BATCH_APPROVE_USERS,
    {
      context: { headers: { authorization: `Bearer ${user.token}` } },
      onCompleted: ({ batchApproveUsers } = {}) => {
        setNumberOfDeleted(batchApproveUsers.length);
        refetch();
        next();
      },
      onError: (error) => {
        addToast({
          type: "error",
          title: "An error has occurred",
          message:
            "Unable to approve users at this time. Please try again later.",
          duration: 10000,
        });
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [batchDeclineUsers, { loading: declineUsersLoading }] = useMutation(
    BATCH_DELETE_USERS,
    {
      context: { headers: { authorization: `Bearer ${user.token}` } },
      onCompleted: ({ batchDeleteUsers } = {}) => {
        setNumberOfDeleted(batchDeleteUsers.length);
        refetch();
        next();
      },
      onError: (error) => {
        addToast({
          type: "error",
          title: "An error has occurred",
          message:
            "Unable to approve users at this time. Please try again later.",
          duration: 10000,
        });
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleConfirmation = async () => {
    if (reject) {
      await batchDeclineUsers({ variables: { userIds } });
    } else {
      await batchApproveUsers({ variables: { userIds } });
    }
  };

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

        <button
          onClick={handleConfirmation}
          disabled={approveUsersLoading || declineUsersLoading}
          className={`${
            approveUsersLoading || declineUsersLoading
              ? "cursor-not-allowed bg-opacity-20"
              : reject
              ? "hover:bg-[#e63939]"
              : "hover:bg-[#1d58e2]"
          } ${
            reject ? "bg-red-500" : "bg-cc"
          } rounded-lg  py-2 font-semibold text-white duration-150`}>
          {approveUsersLoading || declineUsersLoading ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <CgSpinner size={15} className="animate-spin" />
              <span>
                {reject ? "Rejecting users..." : "Approving users..."}
              </span>
            </div>
          ) : (
            <span> {reject ? "Reject" : "Approve"}</span>
          )}
        </button>
      </div>
    </div>
  );
};

const CongratsModal = ({ reject, deleted }) => {
  const { closeModal } = useModalContext();

  return (
    <div>
      <div
        className={`flex h-[90px] w-[112%] -translate-x-[24px] -translate-y-[24px] items-center justify-center  rounded-t-2xl bg-gradient-to-r ${
          reject ? "from-[#ff6c6c] to-[#FF5555]" : "from-cc/80 to-cc"
        }`}>
        <BsCheckCircleFill className="text-5xl text-white" />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl font-semibold">
          Successfully {reject ? "rejected" : "approved"} {deleted} accounts.
        </h4>
        <p className="text-lg text-ccGreyLight">
          {deleted} accounts have been {reject ? "rejected" : "approved"}.{" "}
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
