import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { useAuthContext, useToastContext } from "../../../../../context";
import { DELETE_LINK, GET_CLUB_LINKS } from "../../../../../lib/docs";
import { ModalProvider } from "../../../../general/Modal";
import { DashboardLinks, usePaginationContext } from "../components";
import { LinkAddButton, LinkAddForm } from "../components/links";

export const DashboardNewLinks = () => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const { next, prev } = usePaginationContext();

  const {
    data: { getClubLinks: links } = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_CLUB_LINKS, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
    variables: {
      clubId: "cl1lmh60y10468xv5r4di76cy",
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
      addToast({
        type: "error",
        title: "An unexpected error occurred",
        message: "Error fetching links. Try again later.",
        duration: 10000,
      });
    },
  });

  if (loading)
    return (
      <span>
        <CgSpinner className="animate-spin" />
        Loading invites...
      </span>
    );
  if (error)
    return <p>There was a problem fetching your links. Try again later.</p>;

  return (
    <>
      <ModalProvider>
        <LinkAddButton />
        <LinkAddForm refetch={refetch} />
      </ModalProvider>
      <DashboardLinks links={links} canDelete refetch={refetch} />
      <div className="mt-3 grid w-[380px] grid-cols-2 items-center gap-3">
        <button
          onClick={() => prev()}
          className="rounded-md bg-gray-100 px-9 py-2 duration-100 hover:bg-gray-200">
          Back
        </button>
        <button
          onClick={() => next()}
          className="rounded-md bg-cc px-9 py-2 text-white duration-100 hover:bg-ccDark">
          Continue
        </button>
      </div>
    </>
  );
};
