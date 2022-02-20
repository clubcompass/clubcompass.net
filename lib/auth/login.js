import axios from "axios";
export const login = async ({ user }) => {
  user.email = user.email.toString().toLowerCase();
  try {
    const {
      data: { user: responseUser },
    } = await axios.post("/api/auth/login", user, {
      headers: {
        "Content-Type": "application/json",
        secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
      },
    });
    return { user: responseUser, error: null };
  } catch (e) {
    return { user: null, error: e.response.data.message };
  }
};
