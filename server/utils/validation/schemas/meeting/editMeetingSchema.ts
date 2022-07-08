import { object, string } from "yup";

export const editMeetingSchema = object().shape({
  location: string().required("Location is required"),
  agenda: string().required("meeting agenda is required"),
  minutes: string().required("meeting minutes are required"),
  actionsTaken: string(),
  resultOfVotes: string(),
  oldBusiness: string(),
  newBusiness: string().required(
    "any new business conducted is required to be documented"
  ),
  additionalNotes: string(),
});
