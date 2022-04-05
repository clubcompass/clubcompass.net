import React from "react";
import Link from "next/link";
import { DashboardLinkType } from "./DashboardLinkType";
import { FiChevronRight } from "react-icons/fi";
import { DELETE_LINK } from "../../../../../lib/docs";
import { useMutation } from "@apollo/client";
import { useAuthContext, useToastContext } from "../../../../../context";
import { useManagementContext } from "../context";

import { CgSpinner } from "react-icons/cg";

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
    <div className="flex w-full flex-col gap-2 rounded-lg border px-4 py-4">
      <h5 className="text-xl font-semibold">{link.name}</h5>
      <p className="text-gray-400">{link.link}</p>
      <div className="mt-1 flex justify-between">
        <Link href={link.link}>
          <a target="_blank">
            <DashboardLinkType type={link.type} />
          </a>
        </Link>
        {canDelete ? (
          <button
            onClick={() => handleDelete({ id: link.id })}
            disabled={deleteLoading}
            className="rounded-md bg-gray-100 px-6 py-1 text-gray-600 duration-100 hover:bg-gray-200"
          >
            {deleteLoading ? (
              <span className="flex items-center gap-2">
                <CgSpinner className="animate-spin" /> Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        ) : (
          <Link href={link.link}>
            <a className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-1 text-gray-600 duration-100 hover:bg-gray-200 ">
              View Link
              <FiChevronRight />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
