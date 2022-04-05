import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../lib/docs";
import { AdminAccountsTable } from "../../../components/pages/dashboard/admin/accounts";
import { AdminWrapper } from "../../../components/pages/dashboard/admin";
import { useAuthContext } from "../../../context";

export const AdminAccountsLinks = [
  { label: "Account Applications", link: "/admin/accounts" },
  { label: "Manage Accounts", link: "/admin/accounts/manage" },
];

const AdminAccounts = () => {
  const { user } = useAuthContext();
  const {
    data: { getUsers: users } = {},
    loading,
    refetch,
  } = useQuery(GET_USERS, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
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
      <AdminWrapper links={AdminAccountsLinks}>
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
