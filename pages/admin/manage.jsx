import React from "react";
import { useQuery } from "@apollo/client";
import { GET_APPROVED_CLUBS } from "../../lib/docs/clubDocuments";
import {
  AdminClubsManage,
  AdminWrapper,
} from "../../components/pages/dashboard/admin";
import { AdminLinks } from ".";

const AdminDashboardManage = () => {
  const {
    data: { getApprovedClubs: approvedClubs } = {},
    loading,
    error,
  } = useQuery(GET_APPROVED_CLUBS);

  if (!approvedClubs && loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminWrapper title="Manage Clubs" links={AdminLinks}>
        <AdminClubsManage data={approvedClubs} />
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
