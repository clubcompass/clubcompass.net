import React, { useState } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { db } from "../../../lib/database";
export const CardFooter = ({ slug, userId, clubId, members }) => {
  const isMember = members.includes(userId);
  if (isMember) {
    console.log("user is a member of", slug);
  }
  return (
    <div className="w-full flex flex-row justify-between">
      <CCLink slug={slug} />
      <Button isMember={isMember} userId={userId} clubId={clubId} />
    </div>
  );
};

const CCLink = ({ slug }) => (
  <Link href={`/club/${slug}`}>
    <a className="font-semibold text-cc underline">Learn more</a>
  </Link>
);

const Button = ({ isMember, userId, clubId }) => {
  const [joined, setJoined] = useState(isMember);
  const [loading, setLoading] = useState(false);

  const handleClubAction = async () => {
    try {
      setLoading(true);
      if (joined) {
        await db.club.removeSignup(userId, clubId);
        return setJoined(false);
      } else {
        await db.club.signup(userId, clubId);
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
  } else {
  }

  return (
    <Link href="/login">
      <a className="bg-cc flex flex-row justify-center items-center gap-1 rounded-md px-8 py-1">
        <span className="font-semibold text-sm text-white">Join</span>
      </a>
    </Link>
  );
};
