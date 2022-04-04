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
    data: { getUserClubs: { leaderOf, memberOf, drafts } = {} } = {},
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
    (memberOf?.length === 0 && leaderOf.length === 0 && drafts.length === 0);

  if (isException) {
    return (
      <Exceptions
        emailVerified={user?.emailVerified}
        active={user?.active}
        clubs={memberOf?.length !== 0}
        email={user?.email}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {leaderOf?.length !== 0 && (
        <UserManage clubs={leaderOf} refetch={refetch} />
      )}
      {memberOf?.length !== 0 && (
        <UserClubs clubs={memberOf} refetch={refetch} />
      )}
      {drafts?.length !== 0 && <UserDrafts clubs={drafts} />}
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
