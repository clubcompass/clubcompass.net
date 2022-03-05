import axios from "axios";

const t = `${process.env.NEXT_PUBLIC_URL}/api/tag`;
const tu = `${process.env.NEXT_PUBLIC_URL}/api/tag/update`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const create = async (names) => {
  const { data: response } = await axios.post(
    `${t}/create/`,
    { names: names },
    headers
  );

  return response;
};

// const get1 = async () => {
//   const { data: response } = await axios.get(`${t}/get/`, headers);
//   return response;
// };

const get = {
  all: async () => {
    const { data: response } = await axios.get(`${t}/get/`, headers);
    return response;
  },
  approved: async () => {
    const { data: response } = await axios.get(`${t}/get/`, {
      params: {
        status: "APPROVED",
      },
      headers: headers.headers,
    });
    return response;
  },
};

const update = (id) => {
  return {
    name: async (name) => {
      const { data: response } = await axios.post(
        `${tu}/name`,
        {
          id: id,
          name: name,
        },
        headers
      );

      return response;
    },
  };
};

export const tags = {
  create,
  get,
  update,
};
