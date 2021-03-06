import axios from "axios";

const c = `${process.env.NEXT_PUBLIC_URL}/api/club`;
const cu = `${process.env.NEXT_PUBLIC_URL}/api/club/update`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
  },
};

export const get = {
  all: async () => {
    const { data: response } = await axios.get(`${c}/get`, headers);
    return response;
  },
  approved: async () => {
    try {
      const { data: response } = await axios.get(`${c}/get`, {
        params: {
          source: "CACHE",
          status: "APPROVED",
        },
        headers: headers.headers,
      });

      return response;
    } catch {
      const { data: response } = await axios.get(`${c}/get`, {
        params: {
          source: "DB",
          status: "APPROVED",
        },
        headers: headers.headers,
      });

      return response;
    }
  },
  unapproved: async () => {
    const { data: response } = await axios.get(`${c}/get`, {
      params: {
        source: "DB",
        status: "UNAPPROVED",
      },
      headers: headers.headers,
    });

    return response;
  },
  // cache: async () => {
  //   const { data: response } = await axios.get(
  //     `${c}/get`,
  //     {
  //       source: "CACHE",
  //     },
  //     headers
  //   );
  // },
  by: {
    tags: async (tagIds) => {
      const { data: response } = await axios.get(`${c}/get`, {
        params: {
          source: "DB",
          tagIds: tagIds,
        },
        headers: headers.headers,
      });

      return response;
    },
    id: async (id) => {
      const { data: response } = await axios.get(`${c}/get`, {
        params: {
          source: "DB",
          clubId: id,
        },
        headers: headers.headers,
      });

      return response;
    },
    slug: async (slug) => {
      try {
        const { data: response } = await axios.get(`${c}/get`, {
          params: {
            source: "CACHE",
            slug: slug,
          },
          headers: headers.headers,
        });

        return response;
      } catch {
        const { data: response } = await axios.get(`${c}/get`, {
          params: {
            source: "DB",
            slug: slug,
          },
          headers: headers.headers,
        });

        return response;
      }
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
    dutiesOfMembers: async (dutiesOfMembers) => {
      const { data: response } = await axios.post(
        `${cu}/dutiesOfMembers`,
        {
          id: id,
          dutiesOfMembers: dutiesOfMembers,
        },
        headers
      );

      return response;
    },
    membershipRequirements: async (membershipRequirements) => {
      const { data: response } = await axios.post(
        `${cu}/membershipRequirements`,
        {
          id: id,
          membershipRequirements: membershipRequirements,
        },
        headers
      );

      return response;
    },
    officerMinimumGPA: async (officerMinimumGPA) => {
      const { data: response } = await axios.post(
        `${cu}/officerMinimumGPA`,
        {
          id: id,
          officerMinimumGPA: officerMinimumGPA,
        },
        headers
      );

      return response;
    },
    percentAttendanceForOfficialMeeting: async (
      percentAttendanceForOfficialMeeting
    ) => {
      const { data: response } = await axios.post(
        `${cu}/percentAttendanceForOfficialMeeting`,
        {
          id: id,
          percentAttendanceForOfficialMeeting:
            percentAttendanceForOfficialMeeting,
        },
        headers
      );

      return response;
    },
    percentAttendanceToApproveDecision: async (
      percentAttendanceToApproveDecision
    ) => {
      const { data: response } = await axios.post(
        `${cu}/percentAttendanceToApproveDecision`,
        {
          id: id,
          percentAttendanceToApproveDecision:
            percentAttendanceToApproveDecision,
        },
        headers
      );

      return response;
    },
    purpose: async (purpose) => {
      const { data: response } = await axios.post(
        `${cu}/purpose`,
        {
          id: id,
          purpose: purpose,
        },
        headers
      );

      return response;
    },
    selectionOfOfficers: async (selectionOfOfficers) => {
      const { data: response } = await axios.post(
        `${cu}/selectionOfOfficers`,
        {
          id: id,
          selectionOfOfficers: selectionOfOfficers,
        },
        headers
      );

      return response;
    },
    titlesAndDutiesOfOfficers: async (titlesAndDutiesOfOfficers) => {
      const { data: response } = await axios.post(
        `${cu}/titlesAndDutiesOfOfficers`,
        {
          id: id,
          titlesAndDutiesOfOfficers: titlesAndDutiesOfOfficers,
        },
        headers
      );

      return response;
    },
  };
};

export const clubs = {
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
