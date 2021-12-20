import axios from "axios";
const update = "/api/update";

const club = {
  president: async ({ club_id, user_id }) => {
    const {
      data: { response },
    } = await axios.update(`${update}/president`, { user_id, club_id });
    return response;
  },
};

export const update = {
  club,
};
