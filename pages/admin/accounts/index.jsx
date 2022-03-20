import React from "react";
import { AdminAccountsTable } from "../../../components/pages/dashboard/admin/accounts";
import { AdminWrapper } from "../../../components/pages/dashboard/admin";

export const AdminAccountsLinks = [
  { label: "Applications", link: "/admin/accounts" },
  { label: "Manage", link: "/admin/accounts/manage" },
];

const AdminAccounts = () => {
  return (
    <div>
      <AdminWrapper title="Manage Accounts" links={AdminAccountsLinks}>
        <AdminAccountsTable />
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

export default AdminAccounts;
