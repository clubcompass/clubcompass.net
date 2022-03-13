import React, { useState } from "react";
import { useAuthContext } from "../../../../context";
import { db } from "../../../../lib/database";
import { ChangeEmail } from "./components/ChangeEmail";

export const DashboardAccountInformation = () => {
  const { user } = useAuthContext();
  const blacklist = ["clubs", "canEdit", "invites", "roles"]; // don't display
  const info = Object.keys(user).reduce((acc, key) => {
    if (!blacklist.includes(key)) {
      acc[key] = user[key];
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-2">
      <Name name={`${user.firstname} ${user.lastname}`} />
      <ChangeEmail email={user.email} />
    </div>
  );
};

const Name = ({ name }) => {
  return (
    <div className="flex gap-2">
      <label className="text-gray-500">Name:</label>
      <p>{name}</p>
    </div>
  );
};
