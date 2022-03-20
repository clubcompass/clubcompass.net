import { object, string, array } from "yup";

export const createClubSchema = object().shape({
  name: string().required("Club must have a name"),
  description: string(),
  email: string().email("Email must be valid"),
  meetingDate: string(),
  location: string(),
  availability: string().oneOf(
    ["OPEN", "INVITE_ONLY", "CLOSED"],
    "Invalid availability."
  ),
  presidentId: string(),
  vicePresidentId: string(),
  secretaryId: string(),
  treasurer: string(),
  links: array().of(
    object().shape({
      name: string().required("name of link is required"),
      type: string()
        .required("type of link required")
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
        ),
      link: string()
        .required("link content required")
        .matches(
          /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
          "Website should be a valid URL"
        ),
    })
  ),
});
// .notRequired()
// .default(undefined);
