import React from "react";
import type { GetClubInvitesPayload } from "../../../../../server/graphql/club/types";
import { DashboardMemberCard as Member } from ".";

type Props = { members: GetClubInvitesPayload; refetch: () => void };

export const DashboardMembers = ({ members, refetch }: Props) => {
  const accepted = members.filter((member) => member.status === "ACCEPTED");
  const pending = members.filter((member) => member.status === "PENDING");
  const declined = members.filter((member) => member.status === "DECLINED");

  if (members.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h4 className="font-medium">Members</h4>

      <div className="flex flex-col">
        <MemberGroup>
          {pending.length !== 0 &&
            pending.map((member) => (
              <Member key={member.user.ccid} {...member} />
            ))}
        </MemberGroup>
        <span className="my-4 h-[1px] w-full rounded-full bg-gray-100" />
        <MemberGroup>
          {accepted.length !== 0 &&
            accepted.map((member) => (
              <Member key={member.user.ccid} {...member} />
            ))}
        </MemberGroup>
        <span className="my-4 h-[1px] w-full rounded-full bg-gray-100" />
        <MemberGroup>
          {declined.length !== 0 &&
            declined.map((member) => (
              <Member key={member.user.ccid} {...member} />
            ))}
        </MemberGroup>
      </div>
    </div>
  );
};

const MemberGroup = ({ children }) => (
  <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
    {children}
  </div>
);
