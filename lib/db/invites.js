import axios from "axios";

const i = `${process.env.NEXT_PUBLIC_URL}/api/invite`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const create = async (userId, clubId) => {
  const { data: response } = await axios.post(
    `${i}/create/`,
    {
      userId: userId,
      clubId: clubId,
    },
    headers
  );

  return response;
};

const accept = async (inviteId, clubId, userId) => {
  const { data: response } = await axios.post(
    `${i}/accept/`,
    {
      inviteId: inviteId,
      userId: userId,
      clubId: clubId,
    },
    headers
  );

  return response;
};

const decline = async (id) => {
  const { data: response } = await axios.post(
    `${i}/decline/`,
    {
      id: id,
    },
    headers
  );

  return response;
};

const del = async (id) => {
  const { data: response } = await axios.post(
    `${i}/delete/`,
    {
      id: id,
    },
    headers
  );

  return response;
};

export const invites = {
  create,
  accept,
  decline,
  delete: del,
};
