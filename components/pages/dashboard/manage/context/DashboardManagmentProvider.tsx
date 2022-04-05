import { useState, useContext, createContext } from "react";
import type { ReactChild } from "react";
import type { Club as TClub } from "@prisma/client";
import { useMutation, MutationFunction, MutationOptions } from "@apollo/client";
import { useAuthContext, useToastContext } from "../../../../../context";
import {
  CREATE_CLUB,
  EDIT_CLUB,
  SEND_CLUB_FOR_APPROVAL,
} from "../../../../../lib/docs";
import {
  CreateClubPayload,
  CreateClubArgs,
  EditClubPayload,
  EditClubArgs,
  SendClubForApprovalArgs,
  SendClubForApprovalPayload,
} from "../../../../../server/graphql/club/types";

export type Club = Pick<
  TClub,
  "name" | "description" | "email" | "availability" | "location" | "meetingDate"
>;

export interface ManagementContext {
  clubId: string | null;
  club: Club;
  isLoading: boolean;
  saveClubAsDraft?: MutationFunction<
    { createClub: CreateClubPayload },
    CreateClubArgs
  >;
  editClub?: MutationFunction<{ editClub: EditClubPayload }, EditClubArgs>;
  sendClubForApproval?: MutationFunction<
    { sendClubForApproval: SendClubForApprovalPayload },
    SendClubForApprovalArgs
  >;
}

const ManagementContext = createContext<ManagementContext>({
  clubId: null,
  club: {
    name: "",
    description: "",
    email: "",
    availability: "OPEN",
    location: "",
    meetingDate: "",
  },
  isLoading: false,
});

export const useManagementContext = (): ManagementContext => {
  return useContext(ManagementContext);
};

export const ManagementProvider = ({ children }: { children: ReactChild }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const [clubId, setClubId] = useState<string | null>(null);
  const [club, setClub] = useState<Club>({
    name: "",
    description: "",
    email: "",
    availability: "OPEN",
    location: "",
    meetingDate: "",
  });

  const [saveClubAsDraft, { loading: saveClubAsDraftLoading }] = useMutation<
    { createClub: CreateClubPayload },
    CreateClubArgs
  >(CREATE_CLUB, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    onCompleted: ({ createClub: club = {} }) => {
      setClubId(club.id);
      setClub({
        name: club.name,
        description: club.description,
        email: club.email,
        availability: club.availability,
        location: club.location,
        meetingDate: club.meetingDate,
      });
      addToast({
        type: "info",
        title: `Club created`,
        message: `Club ${club.name} has been created`,
        duration: 5000,
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "Club creation failed",
        message: error.message,
      });
    },
  });

  const [editClub, { loading: editClubLoading }] = useMutation<
    { editClub: EditClubPayload },
    EditClubArgs
  >(EDIT_CLUB, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
    onCompleted: ({ editClub: club = {} }) => {
      addToast({
        type: "info",
        title: `Club edited`,
        message: `Club ${club.name} has been edited`,
        duration: 5000,
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "Club edit failed",
        message: error.message,
      });
    },
  });

  const [sendClubForApproval, { loading: sendClubForApprovalLoading }] =
    useMutation<
      { sendClubForApproval: SendClubForApprovalPayload },
      SendClubForApprovalArgs
    >(SEND_CLUB_FOR_APPROVAL, {
      context: {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      },
      onCompleted: ({ sendClubForApproval: club = {} }) => {
        addToast({
          type: "info",
          title: `Club sent for approval`,

          message: `Club ${club.name} has been sent for approval`,
          duration: 5000,
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          type: "error",
          title: "Club sent for approval failed",
          message: error.message,
        });
      },
    });

  const isLoading =
    saveClubAsDraftLoading || editClubLoading || sendClubForApprovalLoading;

  const value = {
    clubId,
    club,
    isLoading,
    saveClubAsDraft,
    editClub,
    sendClubForApproval,
  };

  return (
    <ManagementContext.Provider value={value}>
      {children}
    </ManagementContext.Provider>
  );
};
