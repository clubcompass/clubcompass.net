import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVITE, DECLINE_INVITE } from "../../../../lib/docs";
import { db } from "../../../../lib/database";
import { BsExclamationLg, BsCheckLg, BsXLg } from "react-icons/bs";

export const DashboardActivityInvites = ({
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

  return (
    <div className="flex flex-col gap-4">
      <div>
        {!pending?.length && (
          <div className="flex flex-col gap-4 mt-[20vh] items-center align-center">
            <div className="flex flex-col items-center gap-1">
              <p className="text-2xl font-bold">
                You dont have any invites yet
              </p>
              <p className="text-lg">Your invites will appear here</p>
            </div>
          </div>
        )}
        {pending?.length !== 0 && <h3 className="mb-2 font-light">Pending</h3>}
        <div className="flex flex-col gap-3">
          {pending?.map((invite, i) => (
            <Invite key={i} {...invite} refetch={refetch} />
          ))}
        </div>
      </div>
      <div>
        {accepted?.length !== 0 && (
          <h3 className="mb-2 font-light">Accepted</h3>
        )}
        <div className="flex flex-col gap-3">
          {accepted?.map((invite, i) => (
            <Invite key={i} {...invite} />
          ))}
        </div>
      </div>
      <div>
        {declined?.length !== 0 && (
          <h3 className="mb-2 font-light">Declined</h3>
        )}
        <div className="flex flex-col gap-3">
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
    PENDING: "#F7B402",
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
          className="bg-[#12b95820] text-[#12b958] hover:bg-[#00800125] py-1 px-4 rounded"
        >
          Accept
        </button>
        <button
          onClick={() => handleChoice("decline")}
          className="bg-[#FF000020] text-[#FF0000] hover:bg-[#FF000035] py-1 px-4 rounded"
        >
          Decline
        </button>
      </div>
    );
  };

  const Status = () => {
    return (
      <span
        style={{
          backgroundColor: colors[status] + "20",
          color: colors[status],
        }}
        className="capitalize py-1 w-[177px] shrink-0 text-center rounded-lg text-white"
      >
        {status.toLowerCase()}
      </span>
    );
  };

  return (
    <div className="flex flex-row w-full px-4 py-2 bg-white rounded-lg border-[1px] justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        <span
          style={{
            backgroundColor: colors[status] + "20",
            color: colors[status],
          }}
          className="p-2 rounded-lg"
        >
          {icons[status]}
        </span>
        <div className="flex flex-col">
          <a className="font-semibold text-xl">{club?.name}</a>
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
