import axios from "axios";

const u = `${process.env.NEXT_PUBLIC_URL}/api/user`;
const uu = `${process.env.NEXT_PUBLIC_URL}/api/user/update`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const get = async ({ email, id, type }) => {
  if (id !== undefined) {
    const { data: response } = await axios.get(`${u}/get?id=${id}`, headers);
    return response;
  }
  if (email !== undefined) {
    const { data: response } = await axios.get(
      `${u}/get?email=${email}`,
      headers
    );
    return response;
  }
  if (type !== undefined) {
    const { data: response } = await axios.get(
      `${u}/get?type=${type}`,
      headers
    );
    return response;
  }

  const { data: response } = await axios.get(`${u}/get`, data, headers);
  return response;
};

const create = async (data) => {
  const { data: response } = await axios.post(`${u}/create`, data, headers);

  return response;
};

const setRoles = async (roleIds) => {
  const { data: response } = await axios.post(
    `${u}/setRoles`,
    { roleIds: roleIds },
    headers
  );

  return response;
};

const assignRoles = async (roleIds) => {
  const { data: response } = await axios.post(
    `${u}/assignRoles`,
    { roleIds: roleIds },
    headers
  );

  return response;
};

const removeRoles = async (roleIds) => {
  const { data: response } = await axios.post(
    `${u}/removeRoles`,
    { roleIds: roleIds },
    headers
  );

  return response;
};

const update = (id) => {
  return {
    firstname: async (firstname) => {
      const { data: response } = await axios.post(
        `${uu}/firstname`,
        {
          id: id,
          firstname: firstname,
        },
        headers
      );

      return response;
    },
    lastname: async (lastname) => {
      const { data: response } = await axios.post(
        `${uu}/lastname`,
        {
          id: id,
          lastname: lastname,
        },
        headers
      );

      return response;
    },
    email: async (email) => {
      const { data: response } = await axios.post(
        `${uu}/email`,
        {
          id: id,
          email: email,
        },
        headers
      );

      return response;
    },
    password: async (password) => {
      const { data: response } = await axios.post(
        `${uu}/password`,
        {
          id: id,
          password: password,
        },
        headers
      );

      return response;
    },
    interests: async (tagIds) => {
      const { data: response } = await axios.post(
        `${uu}/interests`,
        {
          userId: id,
          tagIds: tagIds,
        },
        headers
      );

      return response;
    },
  };
};

export const users = {
  get,
  create,
  setRoles,
  assignRoles,
  removeRoles,
  update,
};
