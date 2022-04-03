import { serialize } from "cookie";
import { CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";
type CookieParams = {
  res: NextApiResponse;
  name: string;
  value: string;
  options?: CookieSerializeOptions;
};

export const setCookie = (
  res: CookieParams["res"],
  name: CookieParams["name"],
  value: CookieParams["value"],
  options: CookieParams["options"] = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};
