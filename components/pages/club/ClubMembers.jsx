import React from "react";

export const ClubMembers = ({
  president,
  vicePresident,
  secretary,
  treasurer,
  members,
}) => {
  president.role = "president";
  vicePresident.role = "vice president";
  secretary.role = "secretary";
  treasurer.role = "treasurer";
  const allMembers = [
    president,
    vicePresident,
    secretary,
    treasurer,
    ...members.map((member) => {
      member.role = "member";
      return member;
    }),
  ];

  return (
    <div className="flex flex-col gap-2 h-[360px] pr-[12px] w-[calc(100%+12px)] overflow-y-scroll">
      {allMembers.map((member) => (
        <Member key={member.id} {...member} />
      ))}
    </div>
  );
};

const Member = ({ firstname, lastname, role }) => {
  const colors = {
    president: "#C3F4E9",
    "vice president": "#FFEAB4",
    secretary: "#FFDCE5",
    treasurer: "#F3DCFE",
    member: "#ACDBF9",
  };

  const color = colors[role];

  return (
    <div className="flex flex-row w-full items-center justify-between">
      <div className="flex flex-row gap-4 items-center">
        <Avatar firstname={firstname} lastname={lastname} color={color} />
        <p className="font-medium">
          {firstname} {lastname}
        </p>
      </div>
      <Label role={role} color={color} />
    </div>
  );
};

const Avatar = ({ firstname, lastname, color }) => {
  const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`;
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-lg"
      style={{ backgroundColor: color }}
    >
      <p className="text-sm font-medium">{initials}</p>
    </div>
  );
};

const Label = ({ role, color }) => {
  return (
    <div className="px-3 py-1 rounded-sm" style={{ backgroundColor: color }}>
      <p className="uppercase text-[0.6rem] font-semibold">{role}</p>
    </div>
  );
};
