import axios from "axios";

const c = `${process.env.NEXT_PUBLIC_URL}/api/club`;
const cu = `${process.env.NEXT_PUBLIC_URL}/api/club/update`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const get = {
  all: async () => {
    const { data: response } = await axios.get(`${c}/get`, headers);
    return response;
  },
  approved: async () => {
    const { data: response } = await axios.get(`${c}/get`, {
      params: {
        source: "DB",
        status: "APPROVED",
      },
      headers: headers.headers,
    });

    return response;
  },
  unapproved: async () => {
    const { data: response } = await axios.get(
      `${c}/get`,
      {
        source: "DB",
        status: "UNAPPROVED",
      },
      headers
    );

    return response;
  },
  cache: async () => {
    const { data: response } = await axios.get(
      `${c}/get`,
      {
        source: "CACHE",
      },
      headers
    );
    return response;
  },
  by: {
    tags: async (tagIds) => {
      const { data: response } = await axios.get(
        `${c}/get`,
        {
          source: "DB",
          tagIds: tagIds,
        },
        headers
      );
      return response;
    },
    id: async (id) => {
      const { data: response } = await axios.get(
        `${c}/get`,
        {
          source: "DB",
          clubId: id,
        },
        headers
      );

      return response;
    },
    slug: async (slug) => {
      const { data: response } = await axios.get(
        `${c}/get`,
        {
          source: "DB",
          slug: slug,
        },
        headers
      );

      return response;
    },
  },
};

const create = async (data) => {
  const { data: response } = await axios.post(`${c}/create/`, data, headers);

  return response;
};

const del = async (id) => {
  const { data: response } = await axios.post(
    `${c}/delete/`,
    { id: id },
    headers
  );

  return response;
};

const sendForReview = async (id) => {
  const { data: response } = await axios.post(
    `${c}/sendForReview/`,
    { id: id },
    headers
  );

  return response;
};

const approve = async (id) => {
  const { data: response } = await axios.post(
    `${c}/approve/`,
    { id: id },
    headers
  );

  return response;
};

const signup = async (userId, clubId) => {
  const { data: response } = await axios.post(
    `${c}/signup/`,
    {
      userId: userId,
      clubId: clubId,
    },
    headers
  );

  return response;
};

const removeSignup = async (userId, clubId) => {
  const { data: response } = await axios.post(
    `${c}/removeSignup/`,
    {
      userId: userId,
      clubId: clubId,
    },
    headers
  );

  return response;
};

const links = (id) => {
  return {
    add: async (name, link, type) => {
      const { data: response } = await axios.post(
        `${c}/links/add`,
        {
          id: id,
          name: name,
          link: link,
          type: type,
        },
        headers
      );

      return response;
    },
    get: async () => {
      const { data: response } = await axios.get(
        `${c}/links/get`,
        {
          id: id,
        },
        headers
      );

      return response;
    },
    remove: async (linkId) => {
      const { data: response } = await axios.post(
        `${c}/links/remove`,
        {
          id: linkId,
        },
        headers
      );

      return response;
    },
  };
};

const update = (id) => {
  return {
    description: async (description) => {
      const { data: response } = await axios.post(
        `${cu}/description/`,
        {
          id: id,
          description: description,
        },
        headers
      );

      return response;
    },
    email: async (email) => {
      const { data: response } = await axios.post(
        `${cu}/email`,
        {
          id: id,
          email: email,
        },
        headers
      );

      return response;
    },
    location: async (location) => {
      const { data: response } = await axios.post(
        `${cu}/location`,
        {
          id: id,
          location: location,
        },
        headers
      );

      return response;
    },
    meetingDate: async (meetingDate) => {
      const { data: response } = await axios.post(
        `${cu}/meetingDate`,
        {
          id: id,
          meetingDate: meetingDate,
        },
        headers
      );

      return response;
    },
    name: async (name) => {
      const { data: response } = await axios.post(
        `${cu}/name`,
        {
          id: id,
          name: name,
        },
        headers
      );

      return response;
    },
    tags: async (tagIds) => {
      const { data: response } = await axios.post(
        `${cu}/tags`,
        {
          id: id,
          tagIds: tagIds,
        },
        headers
      );

      return response;
    },
    teacher: async (teacherId) => {
      const { data: response } = await axios.post(
        `${cu}/teacher`,
        {
          clubId: id,
          teacherId: teacherId,
        },
        headers
      );

      return response;
    },
    availability: async (availability) => {
      const { data: response } = await axios.post(
        `${cu}/availability`,
        {
          id: id,
          availability: availability,
        },
        headers
      );

      return response;
    },
  };
};

export const club = {
  get,
  create,
  delete: del,
  approve,
  sendForReview,
  signup,
  removeSignup,
  links,
  update,
};
