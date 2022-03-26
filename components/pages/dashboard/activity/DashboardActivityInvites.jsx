import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVITE, DECLINE_INVITE } from "../../../../lib/docs";
import { db } from "../../../../lib/database";
import {
  BsExclamationLg,
  BsCheckLg,
  BsXLg,
  BsExclamationCircle,
} from "react-icons/bs";
import { Loading } from "../../../general/Loading";

export const DashboardActivityInvites = ({
  user,
  loading,
  refetch,
  pending,
  accepted,
  declined,
}) => {
  console.log(pending);
  console.log(accepted);
  console.log(declined);
  // revalidate invites
  // const [invitesList, setInvitesList] = useState(invites);
  // const refetch = async () => {
  //   const user = await db.users.get({ id: invites[0].userId }); // loading state will revalidating
  //   console.log(user);
  //   return setInvitesList(user.invites);
  // };
  // const pending = invitesList.filter((invite) => invite.status === "PENDING");
  // const accepted = invitesList.filter((invite) => invite.status === "ACCEPTED");
  // const declined = invitesList.filter((invite) => invite.status === "DECLINED");

  if (user === null) return <Loading />;
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <div>
        {!pending?.length && (
          <div className="align-center mt-[20vh] flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div>
                <BsExclamationCircle className="text-cc" size="65px" />
              </div>
              <p className="text-2xl font-bold">
                You dont have any invites yet!
              </p>
              <p className="text-lg">Your invites will appear here.</p>
            </div>
          </div>
        )}
        {pending?.length !== 0 && (
          <h3 className="mb-1 tracking-wider text-[#9B9B9B]">Pending</h3>
        )}
        <div className="flex flex-col gap-3">
          {pending?.map((invite, i) => (
            <Invite key={i} {...invite} refetch={refetch} />
          ))}
        </div>
      </div>
      <div>
        {accepted?.length !== 0 && (
          <h3 className="mb-1 tracking-wider text-[#9B9B9B]">Accepted</h3>
        )}
        <div className="flex flex-col gap-3">
          {accepted?.map((invite, i) => (
            <Invite key={i} {...invite} />
          ))}
        </div>
      </div>
      <div>
        {declined?.length !== 0 && (
          <h3 className="mb-1 text-[#9B9B9B]">Declined</h3>
        )}
        <div className="flex flex-col gap-3 tracking-wider">
          {declined?.map((invite, i) => (
            <Invite key={i} {...invite} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Invite = ({ id, userId, clubId, status, club, refetch }) => {
  console.log(club);
  const [acceptInvite] = useMutation(ACCEPT_INVITE, {
    onCompleted: async (data) => {
      console.log(data);
      return await refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const [declineInvite] = useMutation(DECLINE_INVITE, {
    onCompleted: async (data) => {
      console.log(data);
      return await refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const colors = {
    PENDING: "#FFBF00",
    ACCEPTED: "#12b958",
    DECLINED: "#FF0000",
  };

  const icons = {
    PENDING: <BsExclamationLg />,
    ACCEPTED: <BsCheckLg />,
    DECLINED: <BsXLg />,
  };

  const ActionButtons = () => {
    const handleChoice = async (choice) => {
      console.log(choice);
      if (choice === "accept") {
        return await acceptInvite({
          variables: {
            inviteId: id,
            clubId: club.id,
          },
        });
      } else if (choice === "decline") {
        return await declineInvite({
          variables: {
            inviteId: id,
            clubId: club.id,
          },
        });
      }
    };

    return (
      <div className="flex flex-row gap-2">
        <button
          onClick={() => handleChoice("accept")}
          className="rounded-lg bg-[#12b958] py-1 px-4 font-semibold text-white">
          Accept
        </button>
        <button
          onClick={() => handleChoice("decline")}
          className="rounded-lg bg-red-500 py-1 px-4 font-semibold text-white">
          Decline
        </button>
      </div>
    );
  };

  const Status = () => {
    return (
      <span
        style={{
          backgroundColor: colors[status],
          color: "white",
        }}
        className="w-[177px] shrink-0 rounded-lg py-1 text-center font-semibold capitalize text-white">
        {status.toLowerCase()}
      </span>
    );
  };

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border-2 bg-white px-4 py-2">
      <div className="flex items-center gap-4">
        <span
          style={{
            backgroundColor: colors[status],
            color: "white",
          }}
          className="rounded-lg p-2">
          {icons[status]}
        </span>
        <div className="flex flex-col">
          <a className="text-xl font-semibold">{club?.name}</a>
          <p className="text-sm text-gray-400 line-clamp-1">
            {club?.description}
          </p>
        </div>
      </div>
      {status === "PENDING" && <ActionButtons />}
      {status === "ACCEPTED" && <Status status={status} />}
      {status === "DECLINED" && <Status status={status} />}
    </div>
  );
};
