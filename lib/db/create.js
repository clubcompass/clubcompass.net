import axios from "axios";
const c = `${process.env.NEXT_PUBLIC_URL}/api/create`;
const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const club = async ({ data }) => {
  const { data: response } = await axios.post(
    `${c}/club/`,
    { ...data },
    headers
  );
  return response;
};

const connection = async ({ data }) => {
  const { data: response } = await axios.post(
    `${c}/signup/`,
    { ...data },
    headers
  );
  return response;
};

const user = async ({ data }) => {
  const { data: response } = await axios.post(
    `${c}/user/`,
    { ...data },
    headers
  );
  return response;
};

const tags = async ({ data }) => {
  const { data: response } = await axios.post(
    `${c}/tags/`,
    { ...data },
    headers
  );
  return response;
};

export const create = {
  club,
  user,
  tags,
  connection,
};
