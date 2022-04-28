import React from "react";
import Link from "next/link";
import { DashboardLinkType } from "./DashboardLinkType";
import { FiChevronRight } from "react-icons/fi";
import { DELETE_LINK } from "../../../../../lib/docs";
import { useMutation } from "@apollo/client";
import { useAuthContext, useToastContext } from "../../../../../context";
import { useManagementContext } from "../context";

import { CgSpinner } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";

export const DashboardLinks = ({ links, canDelete, refetch }) => {
  return (
    <div className="flex flex-col justify-items-center gap-6 md:grid md:grid-cols-dashboardCards">
      {links.map((link, i) => (
        <LinkCard key={i} link={link} canDelete={canDelete} refetch={refetch} />
      ))}
    </div>
  );
};

const LinkCard = ({ link, canDelete, refetch }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const { clubId } = useManagementContext();

  const [deleteLink, { loading: deleteLoading }] = useMutation(DELETE_LINK, {
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: async (data) => {
      addToast({
        type: "info",
        title: "Successfully deleted link",
        message: "Removed link from your club.",
        duration: 5000,
      });
      return await refetch();
    },
    onError: (err) => {
      addToast({
        type: "error",
        title: "An unexpected error occurred",
        message: "Failed to remove link. Please try again later.",
        duration: 10000,
      });
    },
  });

  const handleDelete = async ({ id }) => {
    await deleteLink({
      variables: {
        clubId,
        data: {
          linkId: id,
        },
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="w-fit">
        {canDelete ? (
          <button
            onClick={() => handleDelete({ id: link.id })}
            disabled={deleteLoading}
            className={`${
              deleteLoading
                ? "animate-pulse cursor-not-allowed bg-gray-50 text-gray-400"
                : "bg-[#F4F4F4] text-[#3C3D41] hover:bg-red-50 hover:text-red-500"
            } inline-flex items-center gap-2 rounded-md px-2 capitalize duration-200 `}>
            {deleteLoading ? (
              <>
                <CgSpinner size={13} className="animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <BiTrash size={14} />
                <span>Delete</span>
              </>
            )}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-2 rounded-lg border px-4 py-3">
        <span className="font-medium">{link.name}</span>
        <div className="flex items-center justify-between gap-2">
          <span className="break-all text-[#848484]">{link.link}</span>
          <Link href={link.link}>
            <a target="_blank">
              <DashboardLinkType type={link.type} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
