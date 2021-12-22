import axios from "axios";
const u = "/api/update";

const club = ({ club_id }) => {
  return {
    description: async ({ description }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/description`, { club_id, description });
      return response;
    },
    email: async ({ email }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/email`, { club_id, email });
      return response;
    },
    image_caption: async ({ image_caption }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/image_caption`, { club_id, image_caption });
      return response;
    },
    image_link: async ({ image_link }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/image_link`, { club_id, image_link });
      return response;
    },
    link_name: async ({ link_name }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/link_name`, { club_id, link_name });
      return response;
    },
    link: async ({ link }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/link`, { club_id, link });
      return response;
    },
    meeting_location: async ({ meeting_location }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/meeting_location`, {
        club_id,
        meeting_location,
      });
      return response;
    },
    meeting_time: async ({ meeting_time }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/meeting_time`, { club_id, meeting_time });
      return response;
    },
    name: async ({ name }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/name`, { club_id, name });
      return response;
    },
    president: async ({ user_id }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/president`, { club_id, user_id });
      return response;
    },
    tags: async ({ tags }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/tags`, { club_id, tags });
      return response;
    },
    teacher: async ({ teacher }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/teacher`, { club_id, teacher });
      return response;
    },
  };
};

const user = ({ user_id }) => {
  return {
    email: async ({ email }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/email`, { user_id, email });
      return response;
    },
    firstname: async ({ firstname }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/firstname`, { user_id, firstname });
      return response;
    },
    lastname: async ({ lastname }) => {
      const {
        data: { response },
      } = await axios.update(`${u}/lastname`, { user_id, lastname });
      return response;
    },
  };
};

export const update = {
  club,
  user,
};
