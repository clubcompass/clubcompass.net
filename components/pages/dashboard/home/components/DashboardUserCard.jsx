import React from "react";
import Link from "next/link";
import { StatusTag } from "../../../../general/StatusTag";
import { IconLabel } from "../../../../general/IconLabel";
import { ActionModal } from "../../../../general/ActionModal";
import { FiChevronRight } from "react-icons/fi";
import { useAuthContext } from "../../../../../context";
import { DashboardActionModal } from "./DashboardActionModal";

export const DashboardUserCard = ({ club, refetch }) => {
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
      <div className="flex flex-col gap-4 px-6">
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
          <DashboardActionModal club={club} refetch={refetch} />
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
