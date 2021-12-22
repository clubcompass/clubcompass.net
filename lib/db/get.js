import axios from "axios";
const g = "/api/get";

const clubs = {
  all: async () => {
    const {
      data: { response },
    } = await axios.get(`${g}/clubs`);
    return response;
  },
  by: {
    tag: async ({ tag }) => {
      const {
        data: { response },
      } = await axios.post(`${g}/clubsByTag`, { tag });
      return response;
    },
  },
};

const club = async ({ id }) => {
  const {
    data: { response },
  } = await axios.post(`${g}/club/`, { id });
  return response;
};

const user = async ({ id }) => {
  const {
    data: { response },
  } = await axios.post(`${g}/user/`, { id });
  return response;
};

const tags = async () => {
  const {
    data: { response },
  } = await axios.get(`${g}/tags`);
  return response;
};

export const get = {
  club,
  clubs,
  user,
  tags,
};
