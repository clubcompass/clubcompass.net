import React from "react";
import {
  DashboardAccountInformation as Information,
  DashboardAccountActions as Actions,
} from "../../components/pages/dashboard/account";
const Account = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-2xl">Your profile</h1>
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
