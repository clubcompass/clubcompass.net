import React, { useState } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { BsPeopleFill } from "react-icons/bs";
import { db } from "../../../lib/database";
export const CardFooter = ({ slug, userId, clubId, isMember, memberCount }) => {
  return (
    <div className="w-full flex flex-row justify-between">
      <CCLink slug={slug} />
      <div className="flex flex-row gap-2">
        <MembersCount memberCount={memberCount} />
        <Button isMember={isMember} userId={userId} clubId={clubId} />
      </div>
    </div>
  );
};

const CCLink = ({ slug }) => (
  <Link href={`/club/${slug}`}>
    <a className="font-semibold text-cc underline">Learn more</a>
  </Link>
);

const MembersCount = ({ memberCount }) => (
  <div className="flex flex-row items-center gap-1 bg-[#EDEDED] px-3 rounded-md text-black text-xs">
    <BsPeopleFill />
    <span className="font-semibold">{memberCount}</span>
  </div>
);

const Button = ({ isMember, userId, clubId }) => {
  const [joined, setJoined] = useState(isMember);
  const [loading, setLoading] = useState(false);

  const handleClubAction = async () => {
    try {
      setLoading(true);
      if (joined) {
        await db.clubs.removeSignup(userId, clubId);
        return setJoined(false);
      } else {
        await db.clubs.signup(userId, clubId);
        return setJoined(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (userId) {
    return (
      <button
        className={`${joined ? "bg-[#FF5555]" : "bg-cc"} ${
          loading && "cursor-not-allowed bg-opacity-50"
        } flex flex-row justify-center items-center gap-1 rounded-md px-8 py-1`}
        onClick={() => handleClubAction()}
        disabled={loading}
      >
        <span className="font-semibold text-sm text-white">
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
            "Leave"
          ) : (
            "Join"
          )}
        </span>
      </button>
    );
  }

  return (
    <Link href="/login">
      <a className="bg-cc flex flex-row justify-center items-center gap-1 rounded-md px-8 py-1">
        <span className="font-semibold text-sm text-white">Join</span>
      </a>
    </Link>
  );
};
