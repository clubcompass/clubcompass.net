import axios from "axios";
const get = "/api/get";

const clubs = {
  all: async () => {
    const {
      data: { response },
    } = await axios.get(`${get}/clubs`);
    return response;
  },
  by: {
    tag: async ({ tag }) => {
      const {
        data: { response },
      } = await axios.post(`${get}/clubsByTag`, { tag });
      return response;
    },
  },
};

const club = {
  by: {
    id: async ({ id }) => {
      const {
        data: { response },
      } = await axios.post(`${get}/club/`, { id });
      return response;
    },
  },
};

const user = {
  by: {
    id: async ({ id }) => {
      const {
        data: { response },
      } = await axios.post(`${get}/user/`, { id });
      return response;
    },
  },
};

const tags = {
  all: async () => {
    const {
      data: { response },
    } = await axios.get(`${get}/tags`);
    return response;
  },
};

export const get = {
  club,
  clubs,
  user,
  tags,
};
