import axios from "axios";
const delet = "/api/delete";

const club = async ({ id }) => {
  const {
    data: { response },
  } = await axios.delete(`${delet}/club/`, { id });
  return response;
};

const user = {
  fromClub: async ({ id }) => {
    const {
      data: { response },
    } = await axios.delete(`${delet}/user/`, { id });
    return response;
  },
};

export const del = {
  club,
  user,
};
