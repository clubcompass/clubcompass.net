import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context";
import { GET_USER_INVITES } from "../../lib/docs";
import { Loading } from "../../components/general/Loading";
import { DashboardActivityInvites as Invites } from "../../components/pages/dashboard/activity";
const Activity = () => {
  const { user } = useAuthContext();

  const {
    data: {
      getUserInvites: { acceptedInvites, pendingInvites, declinedInvites } = {},
    } = {},
    refetch,
    errors,
    invitesLoading,
  } = useQuery(GET_USER_INVITES, {
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {!invitesLoading ? (
        <Invites
          user={user}
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
    },
  };
};

export default Activity;
