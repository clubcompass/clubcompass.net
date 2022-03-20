import React from "react";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
import { ChangePasswordModal } from "./components";
export const DashboardAccountActions = () => {
  const { user, loading } = useAuthContext();

  if (!user && !loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl">Edit interests</h4>
        <p className="text-gray-500 text-sm">
          Your interests effect your view of clubs. Changing your interests will
          change the view of the Clubs page.
        </p>
        Interests component here
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-xl">Change password</h4>
        <p className="text-gray-500 text-sm">
          Changing your password is a non-reverseable action. Make sure you keep
          your password safe.
        </p>
        <ChangePasswordModal id={user?.id} />
      </div>
    </div>
  );
};
