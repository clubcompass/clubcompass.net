import React from "react";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
import { ChangePasswordModal } from "./components";
import { TagSelection } from "../../../general/input";
import { GET_TAGS } from "../../../../lib/docs";
import { useQuery } from "@apollo/client";

export const DashboardAccountActions = () => {
  const { user, loading } = useAuthContext();

  const {
    data: { getTags: tags } = {},
    loading: { tagsLoading },
    error: { tagError } = {},
  } = useQuery(GET_TAGS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!user && !loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl">Edit interests</h4>
        <p className="text-sm text-gray-500">
          Your interests effect your view of clubs. Changing your interests will
          change the view of the Clubs page.
        </p>
        {/* Intersts compoentn there */}
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-xl">Change password</h4>
        <p className="text-sm text-gray-500">
          Changing your password is a non-reverseable action. Make sure you keep
          your password safe.
        </p>
        <ChangePasswordModal id={user?.id} />
      </div>
    </div>
  );
};
