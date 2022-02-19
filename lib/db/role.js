import axios from "axios";

const r = `${process.env.NEXT_PUBLIC_URL}/api/role`;
const ru = `${process.env.NEXT_PUBLIC_URL}/api/role/update`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const create = async (name, color, type) => {
  const { data: response } = await axios.post(
    `${r}/create/`,
    {
      name: name,
      color: color,
      type: type,
    },
    headers
  );

  return response;
};

const get = async (id) => {
  const { data: response } = await axios.get(`${r}/get/`, { id: id }, headers);

  return response;
};

const del = async (id) => {
  const { data: response } = await axios.post(
    `${r}/delete/`,
    { id: id },
    headers
  );

  return response;
};

const update = (id) => {
  return {
    name: async (name) => {
      const { data: response } = await axios.post(
        `${ru}/name/`,
        {
          id: id,
          name: name,
        },
        headers
      );

      return response;
    },
    color: async (color) => {
      const { data: response } = await axios.post(
        `${ru}/color/`,
        {
          id: id,
          color: color,
        },
        headers
      );

      return response;
    },
    type: async (type) => {
      const { data: response } = await axios.post(
        `${ru}/type/`,
        {
          id: id,
          type: type,
        },
        headers
      );

      return response;
    },
  };
};

export const role = {
  create,
  get,
  delete: del,
  update,
};
