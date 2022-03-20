import React from "react";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
import { ChangePasswordForm } from "./components";
export const DashboardAccountActions = () => {
  const { user, loading } = useAuthContext();

  if (!user && !loading) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Account Actions</h2>
      <div className="flex flex-col gap-2">
        <ChangePassword id={user?.id} />
      </div>
    </div>
  );
};

const ChangePassword = ({ id }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <div className="flex flex-col gap-2">
        <ChangePasswordForm id={id} />
      </div>
    </div>
  );
};
