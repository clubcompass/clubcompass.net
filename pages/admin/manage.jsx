import React from "react";
import {
  AdminClubsManage,
  AdminWrapper,
} from "../../components/pages/dashboard/admin";
import { AdminLinks } from ".";

const AdminDashboardManage = () => {
  return (
    <div>
      <AdminWrapper title="Manage Clubs" links={AdminLinks}>
        <AdminClubsManage />
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
