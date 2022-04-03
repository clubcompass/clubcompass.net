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
import { CustomTitle } from "../../../general/CustomTitle";
import { useBreakpoints } from "../../../../hooks";
import { useAuthContext } from "../../../../context";
import {
  DashboardPendingInvite as PendingInvite,
  DashboardOutgoingInvite as OutgoingInvite,
} from "./components";

const { incoming, outgoing } = {
  incoming: {
    pending: [
      {
        id: "cl1fuv2u50112o11oe4na41sb",
        club: {
          id: "cl172n8t40329usxmhsppfjqz",
          name: "All Girls STEM Society",
          slug: "all-girls-stem-society",
          description:
            "To inspire young girls to persue careers in the STEM field",
          status: "DRAFT",
        },
        roles: [{ name: "president" }],

        type: "INCOMING",
        status: "PENDING",
      },
      {
        id: "cl1fv3dp70204o11om00zwqu6",
        club: {
          id: "cl172n8t40329usxmhsppfjqz",
          name: "All Men STEM Society",
          slug: "all-girls-stem-society",
          description:
            "To inspire young girls JFDSKAJF DSKLJFSAD LKJFSDA LKFJSALKF JSDALKF JDSALF JDSALFJ DSALKFJSADLJF ",
          status: "APPROVED",
        },
        roles: [{ name: "secretary" }],
        type: "INCOMING",
        status: "PENDING",
      },
      {
        id: "cl1fv3eod0228o11o3m1ul0g6",
        club: {
          id: "cl172n8t40329usxmhsppfjqz",
          name: "All Boys STEM Society",
          slug: "all-girls-stem-society",
          description:
            "To inspire young girls to persue careers in the STEM field",
          status: "APPROVED",
        },
        roles: [],
        type: "INCOMING",
        status: "PENDING",
      },
      {
        id: "cl1fv3h8x0254o11otwvrfrcy",
        club: {
          id: "cl172n8t40329usxmhsppfjqz",
          name: "All Virgins STEM Society",
          slug: "all-girls-stem-society",
          description:
            "To inspire young girls to persue careers in the STEM field",
          status: "APPROVED",
        },
        roles: [{ name: "vice president" }, { name: "treasurer" }],
        type: "INCOMING",
        status: "PENDING",
      },
      {
        id: "cl1fv3hwx0280o11oxxdfpcg4",
        club: {
          id: "cl172n8t40329usxmhsppfjqz",
          name: "All Girls STEM Society",
          slug: "all-girls-stem-society",
          description:
            "To inspire young girls to persue careers in the STEM field",
          status: "APPROVED",
        },
        roles: [],
        type: "INCOMING",
        status: "PENDING",
      },
    ],
    accepted: [],
    declined: [],
  },
  outgoing: {
    pending: [
      {
        id: "cl172n93i5007usxmstxjbveb",
        club: {
          id: "cl172n93i4991usxm9cu2t8x5",
          name: "High Schoolers Against Cancer",
          slug: "high-schoolers-against-cancer",
          description:
            "Dedicated to fighting cancer, volunteering for the American Cancer Society, and improving high school communities by supporting programs at the American Cancer Society",
          status: "APPROVED",
        },
        roles: [],
        createdAt: "1648938887",
        type: "OUTGOING",
        status: "PENDING",
      },
      {
        id: "cl172n9bp8350usxmosmmzeww",
        club: {
          id: "cl172n9bo8335usxmvgvvao4o",
          name: "The Shoecyclist",
          slug: "the-shoecyclist",
          description:
            "To collect used shoes and donate them to the homeless shelters in our community",
          status: "APPROVED",
        },
        roles: [],
        createdAt: "1648938887",
        type: "OUTGOING",
        status: "PENDING",
      },
      {
        id: "cl172n9bp8349usxm4ewqvx2c",
        club: {
          id: "cl172n9bo8335usxmvgvvao4o",
          name: "The Shoecyclist",
          slug: "the-shoecyclist",
          description:
            "To collect used shoes and donate them to the homeless shelters in our community",
          status: "APPROVED",
        },
        roles: [],
        createdAt: "1648938887",
        type: "OUTGOING",
        status: "PENDING",
      },
    ],
    accepted: [],
    declined: [],
  },
};

export const DashboardActivityInvites = ({
  refetch,
  pending,
  accepted,
  declined,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {!pending?.length && <NoInvites />}
        {incoming.length !== 0 && (
          <CustomTitle
            title="Pending"
            subtitle="You can accept or decline your pending invites."
          />
        )}
        <CardsWrapper>
          {incoming.pending.map((invite, i) => (
            <PendingInvite key={i} invite={invite} refetch={refetch} />
          ))}
        </CardsWrapper>
      </div>
      <div className="flex flex-col gap-4">
        {outgoing?.length !== 0 && (
          <CustomTitle
            title="Outgoing"
            subtitle="Track the status of all your outgoing invites."
          />
        )}
        <CardsWrapper>
          {outgoing?.pending.map((invite, i) => (
            <OutgoingInvite key={i} invite={invite} />
          ))}
        </CardsWrapper>
      </div>
    </div>
  );
};

const Invite = ({ id, userId, clubId, status, club, refetch }) => {
  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;
  const { user } = useAuthContext();
  const [acceptInvite] = useMutation(ACCEPT_INVITE, {
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: async (data) => {
      console.log(data);
      return await refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const [declineInvite] = useMutation(DECLINE_INVITE, {
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
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
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-row">
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
        className="w-full shrink-0 rounded-lg py-1 text-center font-semibold capitalize text-white md:w-[177px]">
        {status.toLowerCase()}
      </span>
    );
  };

  return (
    <div className="flex w-full flex-col justify-between gap-4 rounded-lg border-2 bg-white px-4 py-2 md:flex-row md:items-center">
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
          {!isMobile && (
            <p className="text-sm text-gray-400 line-clamp-1">
              {club?.description}
            </p>
          )}
        </div>
      </div>
      {status === "PENDING" && <ActionButtons />}
      {status === "ACCEPTED" && <Status status={status} />}
      {status === "DECLINED" && <Status status={status} />}
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
