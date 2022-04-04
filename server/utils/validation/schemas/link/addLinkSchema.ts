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
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Website should be a valid URL"
    )
    .required("Please enter website"),
});
