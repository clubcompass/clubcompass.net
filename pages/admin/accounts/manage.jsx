import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../lib/docs";
import { AdminWrapper } from "../../../components/pages/dashboard/admin";
import { AdminAccountsLinks } from ".";
import { AdminAccountsManage } from "../../../components/pages/dashboard/admin/accounts";

const AdminAccountsManagePage = () => {
  const {
    data: { getUsers: users } = {},
    loading,
    refetch,
  } = useQuery(GET_USERS, {
    variables: {
      active: true,
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!users && loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminWrapper title="Manage Accounts" links={AdminAccountsLinks}>
        <AdminAccountsManage data={users} refetch={refetch} />
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
