import React from "react";
import { useAuthContext } from "../../../../context";
export const DashboardAccountInformation = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Account Information</h2>
      <div className="flex flex-col gap-2">
        {Object.keys(user).map((key, i) => (
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
