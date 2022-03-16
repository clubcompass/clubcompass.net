import { client } from "../../requestClient";
import {
  GET_CLUB,
  GET_CLUBS,
  EDIT_CLUB,
  JOIN_CLUB,
  LEAVE_CLUB,
  DELETE_CLUB,
} from "../../../../lib/docs/clubDocuments";
import type {
  GetClubArgs,
  GetClubPayload,
  GetClubsArgs,
  GetClubsPayload,
  JoinClubArgs,
  JoinClubPayload,
  LeaveClubArgs,
  LeaveClubPayload,
} from "../../../graphql/club/types";

export const getClub = async (data: GetClubArgs): Promise<GetClubPayload> => {
  try {
    const { getClub: club } = await client.request(GET_CLUB, {
      ...data,
    });
    return club;
  } catch (e) {
    return e;
  }
};

export const getClubs = async (
  data: GetClubsArgs
): Promise<GetClubsPayload> => {
  try {
    const { getClubs: clubs } = await client.request(GET_CLUBS, {
      data,
    });
    return clubs;
  } catch (e) {
    return e;
  }
};

export const joinClub = async (
  data: JoinClubArgs
): Promise<JoinClubPayload> => {
  try {
    const { joinClub: club } = await client.request(JOIN_CLUB, {
      data,
    });
    return club;
  } catch (e) {
    return e;
  }
};

export const leaveClub = async (
  data: LeaveClubArgs
): Promise<LeaveClubPayload> => {
  try {
    const { leaveClub: club } = await client.request(JOIN_CLUB, {
      data,
    });
    return club;
  } catch (e) {
    return e;
  }
};
