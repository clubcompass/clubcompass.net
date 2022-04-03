import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../../../../context";
import { GET_USER_INVITES } from "../../../../lib/docs";
import { BsExclamationCircle } from "react-icons/bs";
import { CustomTitle } from "../../../general/CustomTitle";
import {
  DashboardPendingInvite as PendingInvite,
  DashboardOutgoingInvite as OutgoingInvite,
} from "./components";

export const DashboardActivityInvites = () => {
  const { user } = useAuthContext();
  const {
    data: { getUserInvites: { incoming, outgoing } = {} } = {},
    loading,
    refetch,
  } = useQuery(GET_USER_INVITES, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) return <p>loading invites...</p>;

  if (
    incoming.pending.length === 0 &&
    outgoing.pending.length === 0 &&
    outgoing.accepted.length === 0 &&
    outgoing.declined.length === 0
  ) {
    return <NoInvites />;
  }

  return (
    <div className="flex flex-col gap-6">
      {incoming.pending.length !== 0 && (
        <div className="flex flex-col gap-4">
          <CustomTitle
            title="Pending"
            subtitle="You can accept or decline your pending invites."
          />
          <CardsWrapper>
            {incoming.pending.map((invite, i) => (
              <PendingInvite key={i} invite={invite} refetch={refetch} />
            ))}
          </CardsWrapper>
        </div>
      )}
      {outgoing?.length !== 0 && (
        <div className="flex flex-col gap-4">
          <CustomTitle
            title="Outgoing"
            subtitle="Track the status of all your outgoing invites."
          />
          <CardsWrapper>
            {outgoing?.pending.map((invite, i) => (
              <OutgoingInvite key={i} invite={invite} />
            ))}
          </CardsWrapper>
        </div>
      )}
    </div>
  );
};

const NoInvites = () => {
  return (
    <div className="align-center mt-[20vh] flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <div>
          <BsExclamationCircle className="text-cc" size="65px" />
        </div>
        <p className="text-2xl font-bold">You dont have any invites yet!</p>
        <p className="text-lg">Your invites will appear here.</p>
      </div>
    </div>
  );
};

const CardsWrapper = ({ children }) => {
  return (
    <div className="flex flex-col justify-items-center gap-6 md:grid md:grid-cols-dashboardCards">
      {children}
    </div>
  );
};
