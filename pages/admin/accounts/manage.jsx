import React from "react";
import { AdminWrapper } from "../../../components/pages/dashboard/admin";
import { AdminAccountsLinks } from ".";
import { AdminAccountsManage } from "../../../components/pages/dashboard/admin/accounts";

const AdminAccountsManagePage = () => {
  return (
    <div>
      <AdminWrapper title="Manage Accounts" links={AdminAccountsLinks}>
        <AdminAccountsManage />
      </AdminWrapper>
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

export default AdminAccountsManagePage;
