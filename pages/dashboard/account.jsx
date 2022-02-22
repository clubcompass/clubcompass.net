import React from "react";
import {
  DashboardAccountInformation as Information,
  DashboardAccountActions as Actions,
} from "../../components/pages/dashboard/account";
const Account = () => {
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
    },
  };
};

export default Account;
