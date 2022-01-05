import axios from "axios";
const u = `${process.env.NEXT_PUBLIC_URL}/api/update`;
const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

const club = ({ club_id }) => {
  return {
    description: async ({ description }) => {
      const { data: response } = await axios.put(
        `${u}/description`,
        {
          club_id,
          description,
        },
        headers
      );
      return response;
    },
    email: async ({ email }) => {
      const { data: response } = await axios.put(
        `${u}/email`,
        {
          club_id,
          email,
        },
        headers
      );
      return response;
    },
    image_caption: async ({ image_caption }) => {
      const { data: response } = await axios.put(
        `${u}/image_caption`,
        {
          club_id,
          image_caption,
        },
        headers
      );
      return response;
    },
    image_link: async ({ image_link }) => {
      const { data: response } = await axios.put(
        `${u}/image_link`,
        {
          club_id,
          image_link,
        },
        headers
      );
      return response;
    },
    link_name: async ({ link_name }) => {
      const { data: response } = await axios.put(
        `${u}/link_name`,
        {
          club_id,
          link_name,
        },
        headers
      );
      return response;
    },
    link: async ({ link }) => {
      const { data: response } = await axios.put(
        `${u}/link`,
        {
          club_id,
          link,
        },
        headers
      );
      return response;
    },
    meeting_location: async ({ meeting_location }) => {
      const { data: response } = await axios.put(
        `${u}/meeting_location`,
        {
          club_id,
          meeting_location,
        },
        headers
      );
      return response;
    },
    meeting_time: async ({ meeting_time }) => {
      const { data: response } = await axios.put(
        `${u}/meeting_time`,
        {
          club_id,
          meeting_time,
        },
        headers
      );
      return response;
    },
    name: async ({ name }) => {
      const { data: response } = await axios.put(
        `${u}/name`,
        {
          club_id,
          name,
        },
        headers
      );
      return response;
    },
    president: async ({ user_id }) => {
      const { data: response } = await axios.put(
        `${u}/president`,
        {
          club_id,
          user_id,
        },
        headers
      );
      return response;
    },
    tags: async ({ tags }) => {
      const { data: response } = await axios.put(
        `${u}/tags`,
        {
          club_id,
          tags,
        },
        headers
      );
      return response;
    },
    teacher: async ({ teacher }) => {
      const { data: response } = await axios.put(
        `${u}/teacher`,
        {
          club_id,
          teacher,
        },
        headers
      );
      return response;
    },
  };
};

const user = ({ user_id }) => {
  return {
    email: async ({ email }) => {
      const { data: response } = await axios.put(
        `${u}/email`,
        {
          user_id,
          email,
        },
        headers
      );
      return response;
    },
    firstname: async ({ firstname }) => {
      const { data: response } = await axios.put(
        `${u}/firstname`,
        {
          user_id,
          firstname,
        },
        headers
      );
      return response;
    },
    lastname: async ({ lastname }) => {
      const { data: response } = await axios.put(
        `${u}/lastname`,
        {
          user_id,
          lastname,
        },
        headers
      );
      return response;
    },
  };
};

export const update = {
  club,
  user,
};
