import React from "react";
import Link from "next/link";
import { StatusTag } from "../../../../general/StatusTag";
import { IconLabel } from "../../../../general/IconLabel";
import { FiChevronRight } from "react-icons/fi";
import { GiSpaceSuit } from "react-icons/gi";
import { IoMdPin } from "react-icons/io";
import { ActionModal } from "../../../../general/ActionModal";
import { useAuthContext } from "../../../../../context";
import { DashboardActionModal } from "./DashboardActionModal";

export const DashboardUserManageCard = ({ club, refetch }) => {
  const user = useAuthContext();

  return (
    <div
      key={club.slug}
      className="flex w-full flex-col gap-4 rounded-lg border py-4">
      <div className="flex flex-col gap-4 border-b px-6 pb-4">
        <h4 className="text-xl font-semibold">{club.name}</h4>
        <div className="flex flex-col gap-2">
          <InfoContainer>
            Role:{" "}
            {club.roles.length === 0 ? (
              <IconLabel icon="member">Member</IconLabel>
            ) : (
              club.roles.map(({ name }, i) => (
                <IconLabel key={i} icon={name}>
                  {name}
                </IconLabel>
              ))
            )}
          </InfoContainer>
          <InfoContainer>
            Status: <StatusTag label={club.status} type={club.status} />
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
      <div className="flex flex-col gap-4 px-6 pb-2">
        <h5 className="font-semibold">Meeting Information</h5>
        <div className="flex list-disc flex-col gap-2">
          <InfoContainer>
            Location:{" "}
            <IconLabel color={"#2575E5"} icon="location">
              {club.location}
            </IconLabel>
          </InfoContainer>
          <InfoContainer>
            Time: <span className="text-black">{club.meetingDate}</span>
          </InfoContainer>
        </div>
        <div>
          {club.manage ? (
            <Link href={`/manage/${club.slug}`}>
              <a className="mt-1 rounded-md bg-gray-100 px-6 py-2 text-gray-600 duration-75 hover:bg-gray-200">
                Manage
              </a>
            </Link>
          ) : (
            <DashboardActionModal club={club} refetch={refetch} />
          )}
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
