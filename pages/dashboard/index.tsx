import React from "react";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../../context";
import { GET_USER_CLUBS } from "../../lib/docs";
import {
  DashboardUserClubs as UserClubs,
  DashboardUserManage as UserManage,
  DashboardUserDrafts as UserDrafts,
  DashboardExceptions as Exceptions,
} from "../../components/pages/dashboard/home";
import {} from "../../components/pages/dashboard/home";
import { Loading } from "../../components/general/Loading";

const Dashboard = () => {
  const { user } = useAuthContext();
  const {
    data: { getUserClubs } = {},
    loading,
    refetch,
  } = useQuery(GET_USER_CLUBS, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) return <Loading />;

  const isException =
    !user?.emailVerified ||
    !user?.active ||
    (getUserClubs.memberOf?.length === 0 &&
      getUserClubs.leaderOf.length === 0 &&
      getUserClubs.drafts.length === 0);

  if (isException) {
    return (
      <Exceptions
        emailVerified={user?.emailVerified}
        active={user?.active}
        clubs={getUserClubs.memberOf?.length !== 0}
        email={user?.email}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {getUserClubs.leaderOf?.length !== 0 && (
        <UserManage clubs={getUserClubs.leaderOf} refetch={refetch} />
      )}
      {getUserClubs.memberOf?.length !== 0 && (
        <UserClubs clubs={getUserClubs.memberOf} refetch={refetch} />
      )}
      {getUserClubs.drafts?.length !== 0 && (
        <UserDrafts clubs={getUserClubs.drafts} />
      )}
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

export default Dashboard;
