import axios from "axios";
export const updatePassword = async ({ user_id, password }) => {
  try {
    const {
      data: { data: user },
    } = await axios.post(
      "/api/auth/updatePassword",
      { user_id, password },
      {
        headers: {
          "Content-Type": "application/json",
          secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
        },
      }
    );
    return { user, error: null };
  } catch (e) {
    return { user: null, error: e.response.data.message };
  }
};
