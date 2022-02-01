import axios from "axios";
export const register = async ({ data }) => {
  try {
    const r = await axios.post("/api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
        secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
      },
    });
    return { error: null };
  } catch (e) {
    return { error: e.response.data };
  }
};
