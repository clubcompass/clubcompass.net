import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
// import { db } from "../../../../lib/database";
// import { Clubs } from "../../clubs"; //! use club component?
import { Loading } from "../../../general/Loading";
import { Clubs } from "../../clubs";
export const DashboardOwnerOfClubs = () => {
  const { user } = useAuthContext();

  if (!user) return <Loading />;

  const isPresidentOf = user.roles.reduce(
    (acc, role) =>
      role.name === "president" &&
      user.clubs.find((club) => club.id === role.clubId)
        ? acc.concat(user.clubs.find((club) => club.id === role.clubId))
        : acc,
    []
  );

  const hasLeadershipIn = user.roles.reduce(
    (acc, role) =>
      role.type === "LEADERSHIP" && role.name !== "president"
        ? acc.concat(user.clubs.find((club) => club.id === role.clubId))
        : acc,
    []
  );

  // const hasEditor = user.canEdit;

  return (
    <div className="flex flex-col gap-2">
      {isPresidentOf && isPresidentOf.length !== 0 && (
        <ContentSection label="Owned" clubs={isPresidentOf} />
      )}
      {hasLeadershipIn && hasLeadershipIn.length !== 0 && (
        <ContentSection label="Leader" clubs={hasLeadershipIn} />
      )}
      {/* {hasEditor && hasEditor.length !== 0 && (
        <ContentSection label="Can edit" clubs={hasEditor} />
      )} */}
    </div>
  );
};

const ContentSection = ({ label, clubs }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="font-light">{label}</h2>
      <Clubs clubs={clubs} manage />
    </div>
  );
};
