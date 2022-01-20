import axios from "axios";
export const login = async ({ email, password, remember }) => {
  const user = {
    email,
    password,
    remember,
  };
  try {
    const r = await axios.post("/api/auth/login", user, {
      headers: {
        "Content-Type": "application/json",
        secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
      },
    });
    if (r.status === 200) {
      return { error: null };
    } else {
      return { error: r.data.message };
    }
  } catch (e) {
    return { error: e.message };
  }
};
