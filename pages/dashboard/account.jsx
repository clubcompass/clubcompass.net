import React from "react";
import { useAuthContext } from "../../context";
import {
  DashboardAccountInformation as Information,
  DashboardAccountActions as Actions,
} from "../../components/pages/dashboard/account";
const Account = () => {
  const { user, loading } = useAuthContext();
  console.log(loading, user);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <div className="flex flex-col gap-4">
        <Information />
        <Actions />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
      protected: true,
    },
  };
};

export default Account;
