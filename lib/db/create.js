import axios from "axios";
const c = "/api/create";

const club = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${c}/club/`, { ...data });
  return response;
};

const connection = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${c}/signup/`, { ...data });
  return response;
};

const user = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${c}/user/`, { ...data });
  return response;
};

const tags = async ({ data }) => {
  const {
    data: { response },
  } = await axios.post(`${c}/tags/`, { ...data });
  return response;
};

export const create = {
  club,
  user,
  tags,
  connection,
};
