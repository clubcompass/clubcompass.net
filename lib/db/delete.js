import axios from "axios";
const d = `${process.env.NEXT_PUBLIC_URL}/api/delete`;
const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const club = async ({ id }) => {
  const { data: response } = await axios.delete(`${d}/club/`, { id }, headers);
  return response;
};

const user = {
  fromClub: async ({ id }) => {
    const { data: response } = await axios.delete(
      `${d}/user/`,
      { id },
      headers
    );
    return response;
  },
};

export const del = {
  club,
  user,
};
