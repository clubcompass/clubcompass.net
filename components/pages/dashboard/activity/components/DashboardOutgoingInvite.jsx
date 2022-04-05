import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { StatusTag } from "../../../../general/StatusTag";

export const DashboardOutgoingInvite = ({ invite }) => {
  const date = new Date(invite.createdAt * 1000);
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 rounded-lg border px-6 py-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-semibold">{invite.club.name}</h4>
        <InfoList>
          <li>
            Sent:{" "}
            <span className="text-[#57585D]">
              {date.toLocaleString("en-US", { month: "long" })}{" "}
              {date.toLocaleString("en-US", { day: "numeric" })},{" "}
              {date.toLocaleString("en-US", { year: "numeric" })}
            </span>
          </li>
          <li>
            Status: <StatusTag label={invite.status} type={invite.status} />
          </li>
        </InfoList>
      </div>
      {invite.club.status === "APPROVED" && (
        <div className="flex">
          <Link href={`/club/${invite.club.slug}`}>
            <a className="flex items-center gap-1 rounded-md bg-gray-100 px-6 py-1 text-gray-600 duration-75 hover:bg-gray-200">
              View Club <FiChevronRight />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

const InfoList = ({ children }) => {
  return (
    <ul className="flex list-inside list-disc flex-col gap-2 overflow-scroll text-gray-400">
      {children}
    </ul>
  );
};
