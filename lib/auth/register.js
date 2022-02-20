import axios from "axios";
export const register = async ({ data }) => {
  console.log(data);
  try {
    const {
      data: { user },
    } = await axios.post("/api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
        secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
      },
    });
    return { user, error: null };
  } catch (e) {
    if (e.response.data?.error) {
      return { user: null, error: e.response.data.error };
    } else {
      return { user: null, error: e.response.data.message };
    }
  }
};
