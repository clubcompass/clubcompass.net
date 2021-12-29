import axios from "axios";
const g = `${process.env.NEXT_PUBLIC_URL}/api/get`;

const clubs = {
  all: async () => {
    const { data: response } = await axios.get(`${g}/club`);
    return response;
  },
  by: {
    tag: async ({ tag_id }) => {
      const { data: response } = await axios.get(`${g}/club?tag_id=${tag_id}`);
      return response;
    },
  },
};

const club = {
  by: {
    id: async ({ id }) => {
      const { data: response } = await axios.get(`${g}/club?club_id=${id}`);
      return response;
    },
    slug: async ({ slug }) => {
      console.log(`${g}/club?slug=${slug}`);
      const { data: response } = await axios.get(`${g}/club?slug=${slug}`);
      return response;
    },
  },
};

const user = async ({ id }) => {
  const {
    data: { response },
  } = await axios.post(`${g}/user/`, { id });
  return response;
};

const tags = async () => {
  const { data: response } = await axios.get(`${g}/tags`);
  return response;
};

export const get = {
  club,
  clubs,
  user,
  tags,
};
