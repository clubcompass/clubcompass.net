import { object, string, array } from "yup";

export const editClubSchema = object().shape({
  description: string(),
  email: string().email("Email must be valid"),
  meetingDate: string(),
  location: string(),
  availability: string().oneOf(
    ["OPEN", "INVITE_ONLY", "CLOSED"],
    "Invalid availability."
  ),
  tags: array()
    .of(
      object().shape({
        id: string().required("Tag must have an id"),
      })
    )
    .max(4, "no more than 4 tags"),
});
