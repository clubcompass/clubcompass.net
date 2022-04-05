import React from "react";
import Link from "next/link";
import { db } from "../../../lib/database";
import { BsPeopleFill } from "react-icons/bs";
import { ActionModal } from "../../general/ActionModal";
import { useBreakpoints } from "../../../hooks";

export const CardFooter = ({
  name,
  slug,
  clubId,
  isMember,
  memberCount,
  availability,
}) => {
  console.log(name, slug, clubId, isMember, memberCount, availability);
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <CCLink slug={slug} />
      <div className="flex flex-row gap-2">
        <MembersCount memberCount={memberCount} />
        {/* {manage ? (
          <ManageButton slug={slug} />
        ) : ( */}
        <ActionModal
          name={name}
          isMember={isMember}
          clubId={clubId}
          slug={slug}
          availability={availability}
        />
        {/* )} */}
      </div>
    </div>
  );
};

const CCLink = ({ slug }) => {
  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  return (
    <Link href={`/club/${slug}`}>
      <a className="font-semibold text-cc underline">
        {isMobile ? "View" : "View club"}
      </a>
    </Link>
  );
};

const MembersCount = ({ memberCount }) => (
  <div className="flex flex-row items-center gap-1 rounded-md bg-[#EDEDED] px-3 text-xs text-black">
    <BsPeopleFill />
    <span className="font-semibold">{memberCount}</span>
  </div>
);

const ManageButton = ({ slug }) => {
  return (
    <Link href={`/dashboard/manage/edit/${slug}`}>
      <a className="flex items-center justify-center gap-1 rounded-md bg-cc px-4 py-1 text-white">
        Manage
      </a>
    </Link>
  );
};
