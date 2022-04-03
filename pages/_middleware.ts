import { NextResponse } from "next/server";
import { NextApiResponse, NextApiRequest } from "next";
import { verify } from "jsonwebtoken";
import { useToastContext } from "../context";

const middleware = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientURL = process.env.NEXT_PUBLIC_URL;
  const { cookies, url } = req;

  const token = cookies?.token || null;

  // console.log(token);
  if (url.includes("/dashboard")) {
    console.log("token", token, url);
    if (!token) {
      return NextResponse.redirect(new URL("/login", clientURL));
    }
    try {
      verify(token, process.env.SECRET);
      return NextResponse.next();
    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL("/login", clientURL));
    }
  }

  if (url.includes("/login") || url.includes("/register")) {
    if (token) {
      try {
        verify(token, process.env.SECRET);
        return NextResponse.redirect(new URL("/dashboard", clientURL));
      } catch (err) {
        console.log(err);
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};

// redirect to homepage or dashboard if going to login while logged in

export default middleware;
