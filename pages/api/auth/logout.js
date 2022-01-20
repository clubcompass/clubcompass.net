const logout = async (req, res) => {
  return res.end(
    res.setHeader("Set-Cookie", "refreshToken=; max-age=0"),
    res.status(200),
    res.json({ status: "success", message: "Logged out successfully!" })
  );
};

export default logout;
