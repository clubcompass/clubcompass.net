import React from "react";
import { Card } from ".";

export const ClubMembers = ({ members: allMembers }) => {
  const [leaders, members] = allMembers.reduce(
    ([leaders, members], current) =>
      current.roles.find((role) => role?.type === "LEADER")
        ? [[...leaders, current], members]
        : [leaders, [...members, current]],
    [[], []]
  );

  return (
    <div className="grid w-full md:grid-cols-2 md:gap-8">
      <Card title={`Leaders (${leaders.length})`}>
        <div className="max-h-[200px] overflow-y-scroll">
          {leaders.map((member) => (
            <Member member={member} key={member.id} />
          ))}
        </div>
      </Card>
      <Card title={`Members (${members.length})`}>
        <div className="max-h-[192px] overflow-y-scroll">
          {members.length === 0 && (
            <span className="flex justify-center text-ccGreyLight">
              There are currently no members
            </span>
          )}
          {members.map((member) => (
            <Member member={member} key={member.id} />
          ))}
        </div>
      </Card>
    </div>
  );
};

const Member = ({ member }) => {
  // console.log(member.roles[0]);
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center">
        <Avatar
          firstname={member.firstname}
          lastname={member.lastname}
          color={member.roles[0]?.color}
        />
        <span className="ml-3">
          {member.firstname} {member.lastname}
        </span>
      </div>
      <div className="max-w-[110px] overflow-x-scroll scrollbar-hide">
        {member.roles.length > 0 ? (
          <span className="flex">
            {member.roles.map(({ name, type, color }, i) => (
              <Label role={name} color={color} key={i}>
                {name}
              </Label>
            ))}
          </span>
        ) : (
          <Label role="Member" color="#9FDDFC" />
        )}
      </div>
    </div>
  );
};

const Avatar = ({ firstname, lastname, color }) => {
  const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`;
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9FDDFC]"
      style={{ backgroundColor: color }}
    >
      <p className="text-sm font-medium">{initials}</p>
    </div>
  );
};

const Label = ({ role, color }) => {
  return (
    <div
      className="ml-1 rounded-sm bg-[#9FDDFC] px-3 py-1"
      style={{ backgroundColor: color }}
    >
      <p className="truncate text-[0.6rem] font-semibold uppercase">{role}</p>
    </div>
  );
};
