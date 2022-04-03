import React from "react";
import Link from "next/link";
import { StatusTag } from "../../../../general/StatusTag";
import { IconLabel } from "../../../../general/IconLabel";
import { FiChevronRight } from "react-icons/fi";
import { GiSpaceSuit } from "react-icons/gi";
import { IoMdPin } from "react-icons/io";

export const DashboardUserManageCard = ({ club }) => {
  return (
    <div
      key={club.slug}
      className="flex w-full flex-col gap-4 rounded-lg border py-4">
      <div className="flex flex-col gap-4 border-b px-6 pb-4">
        <h4 className="text-xl font-semibold">{club.name}</h4>
        <div className="flex flex-col gap-2">
          <InfoContainer>
            Role:{" "}
            <IconLabel color={"#2575E5"} icon="president">
              Presidnet
            </IconLabel>
            {/* Make with user's role and role color */}
          </InfoContainer>
          <InfoContainer>
            Status:{" "}
            <StatusTag colors={{ bg: "#EDF4FE", fg: "#2575E5" }}>
              Approved
            </StatusTag>
            {/* Make with club's status and color */}
          </InfoContainer>
        </div>
        <div className="flex">
          <Link href={`/club/${club.slug}`}>
            <a className="flex items-center gap-1 text-[#57585D] duration-100 hover:gap-2">
              More information <FiChevronRight className="translate-y-[1px]" />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <h5 className="font-semibold">Meeting Information</h5>
        <div className="flex list-disc flex-col gap-2">
          <InfoContainer>
            Location:{" "}
            <IconLabel color={"#2575E5"} icon="location">
              A101
              {/* make with actual location */}
            </IconLabel>
          </InfoContainer>
          <InfoContainer>
            Time: <span className="text-black">Bi-weekly; Mondays</span>
            {/* make with actual time */}
          </InfoContainer>
        </div>
        <div>
          <Link href={`/manage/${club.slug}`}>
            <a className="mt-1 rounded-md bg-gray-100 px-6 py-2 text-gray-600 duration-75 hover:bg-gray-200">
              Manage
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const InfoContainer = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-gray-400">{children}</div>
  );
};
