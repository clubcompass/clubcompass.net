import React, { useState } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { db } from "../../../lib/database";
import { BsPeopleFill } from "react-icons/bs";
export const CardFooter = ({
  slug,
  userId,
  clubId,
  isMember,
  memberCount,
  manage,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <CCLink slug={slug} />
      <div className="flex flex-row gap-2">
        <MembersCount memberCount={memberCount} />
        {manage ? (
          <ManageButton slug={slug} />
        ) : (
          <Button isMember={isMember} userId={userId} clubId={clubId} />
        )}
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

const ManageButton = ({ slug }) => {
  return (
    <Link href={`/dashboard/manage/edit/${slug}`}>
      <a className="bg-cc text-white flex justify-center items-center gap-1 rounded-md px-4 py-1">
        Manage
      </a>
    </Link>
  );
};

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
