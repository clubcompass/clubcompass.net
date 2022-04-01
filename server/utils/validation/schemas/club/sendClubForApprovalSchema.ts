import { object, string, array } from "yup";

export const sendClubForApprovalSchema = object().shape({
  name: string().required("Club must have a name"),
  description: string().required("Club must have a description"),
  email: string()
    .email("Email must be valid")
    .required("Club must have an email"),
  meetingDate: string().required("Club must have a meeting date"),
  location: string().required("Club must have a location"),
  availability: string()
    .oneOf(["OPEN", "INVITE_ONLY", "CLOSED"], "Invalid availability.")
    .required("Club must have an availability status"),
  tags: array().of(
    object().shape({
      name: string().required("Tag name is required"),
    })
  ),
});
