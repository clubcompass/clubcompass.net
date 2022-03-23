import React from "react";
import { useQuery } from "@apollo/client";
import { GET_UNAPPROVED_CLUBS } from "../../lib/docs/clubDocuments";
import {
  AdminClubsTable,
  AdminWrapper,
} from "../../components/pages/dashboard/admin";

export const AdminLinks = [
  { label: "Applications", link: "/admin" },
  { label: "Manage", link: "/admin/manage" },
];
const AdminDashboard = () => {
  const { data: { getUnapprovedClubs: unapprovedClubs } = {}, loading } =
    useQuery(GET_UNAPPROVED_CLUBS, {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  if (!unapprovedClubs && loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminWrapper title="Manage Clubs" links={AdminLinks}>
        <AdminClubsTable data={unapprovedClubs} />
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

export default AdminDashboard;
