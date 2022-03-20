import React from "react";
import {
  AdminClubsTable,
  AdminWrapper,
} from "../../components/pages/dashboard/admin";

export const AdminLinks = [
  { label: "Applications", link: "/admin" },
  { label: "Manage", link: "/admin/manage" },
];

const AdminDashboard = () => {
  return (
    <div>
      <AdminWrapper title="Manage Clubs" links={AdminLinks}>
        <AdminClubsTable />
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
