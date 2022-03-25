import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context";
import { GET_USER_INVITES } from "../../lib/docs";
import { Loading } from "../../components/general/Loading";
import { DashboardActivityInvites as Invites } from "../../components/pages/dashboard/activity/DashboardActivityInvites";
const Activity = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const {
    data: {
      getUserInvites: { acceptedInvites, pendingInvites, declinedInvites } = {},
    } = {},
    refetch,
    errors,
    invitesLoading,
  } = useQuery(GET_USER_INVITES, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (user) {
      if (!user?.active || !user?.emailVerified) {
        router.push("/dashboard");
      }
    }
  }, [router, user]);

  // console.log(
  //   "renders loading",
  //   !user && loading,
  //   "!user",
  //   !user,
  //   "loading",
  //   loading
  // );

  return (
    <div className="flex flex-col gap-4 md:p-4">
      <h1 className="font-bold uppercase text-[#626262]">Activity</h1>
      {!invitesLoading ? (
        <Invites
          user={user}
          loading={loading}
          refetch={refetch}
          accepted={acceptedInvites}
          pending={pendingInvites}
          declined={declinedInvites}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
      protected: true,
    },
  };
};

export default Activity;
