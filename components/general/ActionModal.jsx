import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ModalProvider, useModalContext } from "./Modal";
import { CgSpinner } from "react-icons/cg";
import { useMutation } from "@apollo/client";
import Confetti from "react-dom-confetti";

import { BsCheckCircleFill } from "react-icons/bs";
import { JOIN_CLUB, LEAVE_CLUB } from "../../lib/docs";
import { useAuthContext } from "../../context";

export const ActionModal = ({
  name,
  isMember,
  clubId,
  slug,
  availability,
  clubPage,
  draft,
}) => {
  const [joined, setJoined] = useState(isMember);
  const closed = availability === "CLOSED";

  return (
    <div>
      <ModalProvider closeColor={{ color: "#ffffff", index: 2 }}>
        <OpenModal
          joined={joined}
          closed={closed}
          clubPage={clubPage}
          draft={draft}
        />
        <ActionButton
          joined={joined}
          setJoined={setJoined}
          clubId={clubId}
          closed={closed}
        />
        <ActionCongrats joined={joined} name={name} slug={slug} />
      </ModalProvider>
    </div>
  );
};

const OpenModal = ({ joined, closed, clubPage, draft }) => {
  const { user } = useAuthContext();
  const { openModal } = useModalContext();

  const clubPageStyle = clubPage && {
    height: "40px",
    width: "130px",
    borderRadius: "0.7rem",
    fontSize: "1rem",
  };

  if (user) {
    return (
      <button
        onClick={openModal}
        disabled={(closed && !joined) || draft}
        style={clubPageStyle}
        className={`${
          joined
            ? "bg-[#FF5555] text-white"
            : closed
            ? "bg-gray-100 text-[#707070]"
            : "bg-cc text-white"
        } flex flex-row items-center justify-center gap-1 rounded-md px-8 py-1 text-sm font-semibold`}>
        {joined ? "Leave" : closed ? "Closed" : "Join"}
      </button>
    );
  }
  return (
    <Link href="/login">
      <a
        style={clubPageStyle}
        className="flex flex-row items-center justify-center gap-1 rounded-md bg-cc px-8 py-1">
        <span className="text-sm font-semibold text-white">Join</span>
      </a>
    </Link>
  );
};

const ActionButton = ({ joined, setJoined, clubId, closed }) => {
  const { user } = useAuthContext();
  const { closeModal, next } = useModalContext();
  const [loading, setLoading] = useState(false);

  console.log(clubId);

  const [joinClub] = useMutation(JOIN_CLUB, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    variables: {
      clubId,
    },
    onCompleted: (data) => {
      setJoined(true);
      setLoading(false);
      next();
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  const [leaveClub] = useMutation(LEAVE_CLUB, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    variables: {
      clubId,
    },
    onCompleted: (data) => {
      setJoined(false);
      setLoading(false);
      next();
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  const handleClubAction = async () => {
    setLoading(true);
    if (joined) {
      return await leaveClub();
    } else {
      return await joinClub();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl font-semibold">
          {joined
            ? closed
              ? "Confirm leaving closed club?"
              : "Confirm leaving club?"
            : "Confirm joining club?"}
        </h4>
        <p className="text-[#686868]">
          By selecting confirm you are {joined ? "removing" : "adding"} yourself{" "}
          {joined ? "from" : "to"} the club&apos;s roster.{" "}
          {joined &&
            closed &&
            "You cannot join this club again without an invite."}
        </p>
      </div>

      <div className="grid-col grid grid-cols-2 gap-2">
        <button
          onClick={closeModal}
          className="rounded-md bg-gray-500/20 py-1 font-semibold">
          Cancel
        </button>
        <button
          className={`${joined ? "bg-[#FF5555]" : "bg-cc"} ${
            loading && "cursor-not-allowed bg-opacity-50"
          } flex flex-row items-center justify-center gap-1 rounded-md px-8 py-1 focus:border-0`}
          onClick={() => handleClubAction()}
          disabled={loading}>
          <span className="font-semibold text-white">
            {loading ? (
              joined ? (
                <span className="flex flex-row items-center gap-2">
                  <CgSpinner className="animate-spin" /> Leaving...
                </span>
              ) : (
                <span className="flex flex-row items-center gap-2">
                  <CgSpinner className="animate-spin" /> Joining...
                </span>
              )
            ) : joined ? (
              "Confirm"
            ) : (
              "Confirm"
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

const ActionCongrats = ({ joined, name, slug }) => {
  const { closeModal } = useModalContext();
  const [active, setActive] = useState(false);
  const router = useRouter();

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
    <div className="flex flex-col">
      <div
        className={`flex h-[90px] w-[112%] -translate-x-[24px] -translate-y-[24px] items-center justify-center  rounded-t-2xl bg-gradient-to-r ${
          joined ? "from-cc/80 to-cc" : "from-[#ff6c6c] to-[#FF5555] "
        }`}>
        <BsCheckCircleFill className="text-5xl text-white" />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          {joined && (
            <div className="flex -translate-y-10 justify-center">
              <Confetti active={active} config={config} />
            </div>
          )}
          <h4 className="text-2xl font-semibold">
            {joined ? "Congratulations!" : "Got it."}
          </h4>
        </div>
        <p className="text-[#686868]">
          {joined
            ? `You are now a member of ${name}! This club will appear in your dashboard.`
            : `You have left ${name}. It will no longer appear in your dashboard.`}
        </p>
        <div
          className={joined ? "grid grid-cols-2 gap-2" : "flex justify-center"}>
          <button
            onClick={closeModal}
            className={`rounded-lg bg-gray-500/20 py-1 font-semibold ${
              !joined && "px-16"
            }`}>
            Close
          </button>
          {joined && (
            <Link
              href={
                router.asPath === `/club/${slug}` ? "/clubs" : `/club/${slug}`
              }>
              <a className="rounded-lg bg-cc py-1 text-center font-semibold text-white">
                {router.asPath === `/club/${slug}`
                  ? "Explore More"
                  : "Visit Club Page"}
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
