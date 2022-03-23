import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../lib/docs";
import { AdminAccountsTable } from "../../../components/pages/dashboard/admin/accounts";
import { AdminWrapper } from "../../../components/pages/dashboard/admin";

export const AdminAccountsLinks = [
  { label: "Applications", link: "/admin/accounts" },
  { label: "Manage", link: "/admin/accounts/manage" },
];

const AdminAccounts = () => {
  const {
    data: { getUsers: users } = {},
    loading,
    refetch,
  } = useQuery(GET_USERS, {
    variables: {
      active: false,
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!users && loading) return <p>Loading...</p>;

  console.log(users);

  return (
    <div>
      <AdminWrapper title="Manage Accounts" links={AdminAccountsLinks}>
        <AdminAccountsTable data={users} refetch={refetch} />
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
