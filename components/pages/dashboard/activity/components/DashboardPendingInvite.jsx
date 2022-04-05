import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVITE, DECLINE_INVITE } from "../../../../../lib/docs";
import { useAuthContext } from "../../../../../context";
import { StatusTag } from "../../../../general/StatusTag";
import { IconLabel } from "../../../../general/IconLabel";
import { useToastContext } from "../../../../../context";
import { CgSpinner } from "react-icons/cg";

export const DashboardPendingInvite = ({ invite, refetch }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();

  const [acceptInvite, { loading: acceptLoading }] = useMutation(
    ACCEPT_INVITE,
    {
      context: {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      },
      onCompleted: async (data) => {
        addToast({
          type: "info",
          title: "Accepted invite.",
          message: `Successfully accepted invite to ${"club name"}`,
        });
        return await refetch();
      },
      onError: (err) => {
        addToast({
          type: "error",
          title: "An error has occurred",
          message:
            "Unable to accept invite at this time. Please try again later.",
          duration: 5000,
        });
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const [declineInvite, { loading: declineLoading }] = useMutation(
    DECLINE_INVITE,
    {
      context: {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      },
      onCompleted: async (data) => {
        addToast({
          type: "info",
          title: "Declined invite.",
          message: `Successfully declined invite to ${"club name"}`,
        });
        return await refetch();
      },
      onError: (err) => {
        addToast({
          type: "error",
          title: "An error has occurred",
          message:
            "Unable to decline invite at this time. Please try again later.",
          duration: 5000,
        });
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleChoice = async (choice) => {
    console.log(choice);
    if (choice === "accept") {
      return await acceptInvite({
        variables: {
          inviteId: invite.id,
          clubId: invite.club.id,
        },
      });
    } else if (choice === "decline") {
      return await declineInvite({
        variables: {
          inviteId: invite.id,
          clubId: invite.club.id,
        },
      });
    }
  };

  const colors = {
    DRAFT: {
      bg: "#FFF2E4",
      fg: "#FF921B",
    },
    REVIEW: {
      bg: "#FFF2E4",
      fg: "#FF921B",
    },
    APPROVED: {
      bg: "#EDF4FE",
      fg: "#2575E5",
    },
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border py-4">
      <div className="flex h-full flex-col justify-between gap-4 border-b px-6 pb-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold">{invite.club.name}</h4>
          <p className="text-gray-400">{invite.club.description}</p>
        </div>
        {invite.club.status === "APPROVED" && (
          <div className="flex">
            <Link href={`/club/${invite.club.slug}`}>
              <a className="flex items-center gap-1 text-[#57585D] duration-100 hover:gap-2">
                More information
                <FiChevronRight className="translate-y-[1px]" />
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 px-6">
        <h5 className="font-semibold">Invite Information</h5>
        <div className="flex flex-col gap-3">
          <InfoContainer>
            Club Status:
            <StatusTag colors={colors[invite.club.status]}>
              {invite.club.status.toLowerCase()}
            </StatusTag>
          </InfoContainer>
          <InfoContainer>
            Role:{" "}
            {invite.roles.length !== 0 ? (
              <div className="flex flex-wrap gap-1">
                {invite.roles.map((role, i) => (
                  <IconLabel key={i} icon={role.name}>
                    {role.name}
                  </IconLabel>
                ))}
              </div>
            ) : (
              <IconLabel icon="member">Member</IconLabel>
            )}
          </InfoContainer>
        </div>
        <div className="mt-1 flex gap-4">
          <button
            onClick={() => handleChoice("decline")}
            disabled={declineLoading}
            className="rounded-md bg-gray-100 px-8 py-2 text-gray-600 duration-75 hover:bg-gray-200">
            {declineLoading ? (
              <span className="flex items-center gap-2">
                <CgSpinner className="animate-spin" />
                Declining...
              </span>
            ) : (
              "Decline"
            )}
          </button>
          <button
            onClick={() => handleChoice("accept")}
            disabled={acceptLoading}
            className="rounded-md bg-[#EBFAE2] px-8 py-2 text-[#2A9E00] duration-75 hover:bg-[#dbf0d0]">
            {acceptLoading ? (
              <span className="flex items-center gap-2">
                <CgSpinner className="animate-spin" />
                Accepting...
              </span>
            ) : (
              "Accept"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoContainer = ({ children }) => {
  return (
    <div className="flex gap-2 whitespace-nowrap capitalize text-gray-400 md:items-center">
      {children}
    </div>
  );
};
