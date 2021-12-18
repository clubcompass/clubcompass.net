import axios from "axios";

const club = {
  president: async ({ club_id, user_id }) => {
    const {
      data: { response },
    } = await axios.post("/api/makePresident/", { user_id, club_id });
    return response;
  },
};

export const update = {
  club,
};
