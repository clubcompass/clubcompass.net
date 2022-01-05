import axios from "axios";
const g = `${process.env.NEXT_PUBLIC_URL}/api/get`;
const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const clubs = {
  all: async () => {
    const { data: response } = await axios.get(`${g}/club`, headers);
    return response;
  },
  by: {
    tag: async ({ tag_id }) => {
      const { data: response } = await axios.get(
        `${g}/club?tag_ids=${tag_id}`,
        headers
      );
      return response;
    },
  },
};

const club = {
  by: {
    id: async ({ id }) => {
      const { data: response } = await axios.get(
        `${g}/club?club_id=${id}`,
        headers
      );
      return response;
    },
    slug: async ({ slug }) => {
      console.log(`${g}/club?slug=${slug}`);
      const { data: response } = await axios.get(
        `${g}/club?slug=${slug}`,
        headers
      );
      return response;
    },
  },
};

const user = async ({ id }) => {
  const {
    data: { response },
  } = await axios.post(`${g}/user/`, { id }, headers);
  return response;
};

const tags = async () => {
  const { data: response } = await axios.get(`${g}/tags`, headers);
  return response;
};

export const get = {
  club,
  clubs,
  user,
  tags,
};
