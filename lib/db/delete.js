import axios from "axios";
const d = `${process.env.NEXT_PUBLIC_URL}/api/delete`;

const club = async ({ id }) => {
  const { data: response } = await axios.delete(`${d}/club/`, { id });
  return response;
};

const user = {
  fromClub: async ({ id }) => {
    const { data: response } = await axios.delete(`${d}/user/`, { id });
    return response;
  },
};

export const del = {
  club,
  user,
};
