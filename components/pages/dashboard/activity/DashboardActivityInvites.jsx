import React, { useState } from "react";
import Link from "next/link";
import { db } from "../../../../lib/database";
export const DashboardActivityInvites = ({ invites }) => {
  const [invitesList, setInvitesList] = useState(invites);
  const revalidateInvites = async () => {
    const user = await db.users.get({ id: invites[0].userId }); // loading state will revalidating
    console.log(user);
    return setInvitesList(user.invites);
  };
  const pending = invitesList.filter((invite) => invite.status === "PENDING");
  const accepted = invitesList.filter((invite) => invite.status === "ACCEPTED");
  const declined = invitesList.filter((invite) => invite.status === "DECLINED");
  // PENDING, ACCEPTED, DECLINED
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Invites</h2>
      <h3 className="mb-2 font-semibold">Pending invites</h3>
      <div className="flex flex-col gap-3">
        {pending.map((invite, i) => (
          <Invite key={i} {...invite} revalidateInvites={revalidateInvites} />
        ))}
      </div>
      <h3 className="mb-2 font-semibold">Accepted invites</h3>
      <div className="flex flex-col gap-3">
        {accepted.map((invite, i) => (
          <Invite key={i} {...invite} />
        ))}
      </div>
      <h3 className="mb-2 font-semibold">Declined invites</h3>
      <div className="flex flex-col gap-3">
        {declined.map((invite, i) => (
          <Invite key={i} {...invite} />
        ))}
      </div>
    </div>
  );
};

const Invite = ({ id, userId, clubId, status, club, revalidateInvites }) => {
  const colors = {
    PENDING: "yellow",
    ACCEPTED: "green",
    DECLINED: "red",
  };

  const ActionButtons = () => {
    const handleChoice = async (choice) => {
      console.log(choice);
      if (choice === "accept") {
        await db.invites.accept(id, clubId, userId);
        return revalidateInvites();
      } else if (choice === "decline") {
        await db.invites.decline(id, clubId, userId);
        return revalidateInvites();
      }
    };
    return (
      <div className="flex flex-row gap-2">
        <button
          onClick={() => handleChoice("accept")}
          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Accept
        </button>
        <button
          onClick={() => handleChoice("decline")}
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
          Decline
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <span style={{ backgroundColor: colors[status] }} className="px-2 py-1">
        {status}
      </span>
      <Link href={`/club/${club.slug}`}>
        <a className="text-blue-500 underline">{club.name}</a>
      </Link>

      {status === "PENDING" && <ActionButtons />}
    </div>
  );
};
