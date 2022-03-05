import { useState } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { db } from "../../../lib/database";
import { useAuthContext } from "../../../context/auth.js";
import { useBreakpoints } from "../../../hooks";

export const ClubWrapper = ({ children, id, availability }) => {
  const { user } = useAuthContext();
  const [header, contact, meeting, content, members, similar] = children;
  const { isMd, isSm, isXs } = useBreakpoints();
  const isMobile = isMd || isSm || isXs;

  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="flex flex-col w-full md:flex-row md:justify-between items-center">
        <h1 className="justify-center mb-8 md:mb-0">{header}</h1>
        <Button availability={availability} userId={user?.id} clubId={id} />
      </div>
      <div className="grid grid-rows lg:grid-cols-6 lg:gap-8">
        {isMobile && <Card title="Description">{content}</Card>}
        <div className="order-last lg:order-first lg:col-span-4">
          {!isMobile && <Card title="Description">{content}</Card>}
          {members}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-1 lg:gap-0 lg:col-span-2">
          <Card title="Socials">{contact}</Card>
          <Card title="Meetings">{meeting}</Card>
        </div>
      </div>
      {similar}
    </div>
  );
};

export const Card = ({ title, children }) => {
  return (
    <div className="py-4 md:py-6 px-4 md:px-8 mb-6 rounded-md border-2 border-[#E6E6E6]">
      <p className="font-bold text-lg mb-2">{title}</p>
      {children}
    </div>
  );
};

const Button = ({ availability, userId, clubId }) => {
  const [joined, setJoined] = useState(false);
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

  if (availability === "CLOSED") {
    return (
      <button className="cursor-default bg-[#E7EEFF] h-10 w-48 font-bold px-8 py-0.5 rounded-lg text-[#707070]">
        Closed
      </button>
    );
  }

  if (userId) {
    return (
      <button
        className={`${joined ? "bg-[#FF5555]" : "bg-cc"} ${
          loading && "cursor-not-allowed bg-opacity-50"
        } flex flex-row justify-center items-center gap-1 h-10 w-48 font-bold px-8 py-0.5 rounded-lg text-white`}
        onClick={() => handleClubAction()}
        disabled={loading}
      >
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
      <a className="flex flex-row justify-center items-center gap-1 h-10 w-48 font-bold px-8 py-0.5 rounded-lg text-white bg-cc">
        <span className="font-semibold text-white">Join</span>
      </a>
    </Link>
  );
};
