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
  } = useQuery(GET_USER_INVITES);

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

  if (user === null) return <Loading />;
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl mt-4">Your invites</h1>
      {!invitesLoading ? (
        <Invites
          refetch={refetch}
          accepted={acceptedInvites}
          pending={pendingInvites}
          declined={declinedInvites}
        />
      ) : (
        <p>loading...</p>
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
