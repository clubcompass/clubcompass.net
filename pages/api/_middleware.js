const middleware = async (req) => {
  const secret_key = req.headers.get("secret_key");

  if (secret_key !== process.env.API_AUTHENTICATION_KEY) {
    return new Response(JSON.stringify({ message: "Authentication failed" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default middleware;
