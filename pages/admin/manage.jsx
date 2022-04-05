import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ADMIN_APPROVED_CLUBS } from "../../lib/docs/clubDocuments";
import {
  AdminClubsManage,
  AdminWrapper,
} from "../../components/pages/dashboard/admin";
import { AdminLinks } from "."; // just define it here?
import { useAuthContext } from "../../context";

const AdminDashboardManage = () => {
  const { user } = useAuthContext();
  const {
    data: { getAdminApprovedClubs: approvedClubs } = {},
    loading,
    refetch,
  } = useQuery(GET_ADMIN_APPROVED_CLUBS, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!approvedClubs && loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminWrapper links={AdminLinks}>
        <AdminClubsManage data={approvedClubs} refetch={refetch} />
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

export default AdminDashboardManage;
