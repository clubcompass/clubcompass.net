import axios from "axios";

const club = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post("/api/createClub/", { ...data });
  return response;
};

const user = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post("/api/createUser/", { ...data });
  return response;
};

const tags = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post("/api/createTags/", { ...data });
  return response;
};

export const create = {
  club,
  user,
  tags,
};
