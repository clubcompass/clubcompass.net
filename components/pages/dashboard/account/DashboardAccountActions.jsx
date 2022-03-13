import React from "react";
import { useAuthContext } from "../../../../context";
import { ChangePasswordModal } from "./components";
export const DashboardAccountActions = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <ChangePassword id={user.id} />
      </div>
    </div>
  );
};

const ChangePassword = ({ id }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <div className="flex flex-col gap-2">
        <ChangePasswordModal id={id} />
      </div>
    </div>
  );
};
