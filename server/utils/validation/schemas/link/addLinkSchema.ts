import { object, string } from "yup";

export const addLinkSchema = object().shape({
  name: string().required("name of link is required"),
  type: string()
    .oneOf(
      [
        "EMAIL",
        "TWITTER",
        "INSTAGRAM",
        "DISCORD",
        "YOUTUBE",
        "FACEBOOK",
        "REMIND",
        "SNAPCHAT",
        "WEBSITE",
      ],
      "Invalid link type."
    )
    .required("link type is required"),
  link: string()
    .matches(
      /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      "Website should be a valid URL"
    )
    .required("link is required"),
});
