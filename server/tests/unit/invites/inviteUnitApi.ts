// import * as Client from "@prisma/client";
import { client } from "../../requestClient";
import {
  GET_USER_INVITES,
  ACCEPT_INVITE,
  DECLINE_INVITE, // need tests
  ISSUE_INVITE, // need tests
} from "./inviteUnitDocuments";
import type { AcceptInviteArgs } from "../../../graphql/invite/resolvers/acceptInvite";
import type { UserInvitesPayload } from "../../../graphql/invite/getUserInvites";

export const getUserInvites = async ({
  token,
}: {
  token: string;
}): Promise<UserInvitesPayload> => {
  const { getUserInvites: invites } = (await client.request(
    GET_USER_INVITES,
    {},
    {
      authorization: `Bearer ${token}`,
    }
  )) as { getUserInvites: UserInvitesPayload };

  return invites;
};

export const acceptInvite = async ({
  clubId,
  inviteId,
  token,
}: AcceptInviteArgs & { token: string }): Promise<typeof invites> => {
  const { getUserInvites: invites } = await client.request(
    ACCEPT_INVITE,
    {
      clubId,
      inviteId,
    },
    {
      authorization: `Bearer ${token}`,
    }
  );

  return invites;
};
