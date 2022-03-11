import React from "react";
import { useAuthContext } from "../../../../context";
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
      <h2 className="text-lg font-semibold">Account Information</h2>
      <div className="flex flex-col gap-2">
        {Object.keys(info).map((key, i) => (
          <InfoItem key={i} label={key} value={user[key]} />
        ))}
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-sm font-semibold">{label}: </div>
      <div className="text-sm">{value}</div>
    </div>
  );
};
