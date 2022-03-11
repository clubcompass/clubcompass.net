import React from "react";
import { useAuthContext } from "../../context";
import { DashboardActivityInvites as Invites } from "../../components/pages/dashboard/activity/DashboardActivityInvites";
const Activity = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl mt-4">Your invites</h1>
      <Invites invites={user.invites} />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default Activity;
