import React from "react";
import { useQuery } from "@apollo/client";
import { GET_UNAPPROVED_CLUBS } from "../../lib/docs/clubDocuments";
import {
  AdminClubsTable,
  AdminWrapper,
} from "../../components/pages/dashboard/admin";
import { useAuthContext } from "../../context";

export const AdminLinks = [
  { label: "Club Applications", link: "/admin" },
  { label: "Manage Clubs", link: "/admin/manage" },
];
const AdminDashboard = () => {
  const { user } = useAuthContext();
  const { data: { getUnapprovedClubs: unapprovedClubs } = {}, loading } =
    useQuery(GET_UNAPPROVED_CLUBS, {
      context: { headers: { authorization: `Bearer ${user.token}` } },
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
      <AdminWrapper links={AdminLinks}>
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
