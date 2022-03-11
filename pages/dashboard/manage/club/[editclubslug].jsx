import React from "react";
import { useRouter } from "next/router";

import { DashboardEditClub as EditClub } from "../../../../components/pages/dashboard/manage/edit";

const Edit = () => {
  const router = useRouter();
  const { editclubslug: slug } = router.query;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create New Club</h1>
      <div className="flex flex-col gap-4">
        <EditClub slug={slug} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default Edit;
