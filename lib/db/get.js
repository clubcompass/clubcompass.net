import axios from "axios";

const clubs = {
  all: async () => {
    const {
      data: { response },
    } = await axios.get("/api/getAllClubs");
    return response;
  },
  by: {
    tag: async ({ tag }) => {
      const {
        data: { response },
      } = await axios.post("/api/getClubsByTag", { tag });
      return response;
    },
  },
};

const club = {
  by: {
    id: async ({ id }) => {
      const {
        data: { response },
      } = await axios.post("/api/getClubById/", { id });
      return response;
    },
  },
};

const user = {
  by: {
    id: async ({ id }) => {
      const {
        data: { response },
      } = await axios.post("/api/getUser/", { id });
      return response;
    },
  },
};

export const get = {
  club,
  clubs,
  user,
};
