import axios from "axios";
const create = "/api/create";

const club = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${create}/club/`, { ...data });
  return response;
};

const connection = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${create}/signup/`, { ...data });
  return response;
};

const user = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${create}/user/`, { ...data });
  return response;
};

const tags = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${create}/tags/`, { ...data });
  return response;
};

export const create = {
  club,
  user,
  tags,
  connection,
};
