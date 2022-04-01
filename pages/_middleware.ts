import { NextResponse } from "next/server";
import { NextApiResponse, NextApiRequest } from "next";
import { verify } from "jsonwebtoken";

const middleware = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientURL = process.env.NEXT_PUBLIC_URL;
  const { cookies, url } = req;

  const token = cookies?.token || null;

  if (url.includes("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", clientURL));
    }
    try {
      verify(token, process.env.SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", clientURL));
    }
  }

  return NextResponse.next();
};

// redirect to homepage or dashboard if going to login while logged in

export default middleware;
