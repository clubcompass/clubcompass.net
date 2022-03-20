import React from "react";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
export const DashboardAccountInformation = () => {
  const { user, loading } = useAuthContext();

  if (!user && !loading) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Account Information</h2>
      <div className="flex flex-col gap-2">
        {user &&
          Object.keys(user).map((key, i) => (
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
