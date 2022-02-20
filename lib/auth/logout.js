import axios from "axios";
export const logout = async () => {
  const r = await axios.get("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
      secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
    },
  });
  console.log(r);
};
