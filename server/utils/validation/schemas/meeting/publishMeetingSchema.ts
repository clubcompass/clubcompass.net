import { object, string } from "yup";

export const publishMeetingSchema = object().shape({
  location: string().required("location is required"),
  agenda: string().required("agenda is required"),
  minutes: string(),
  actionsTaken: string(),
  resultOfVotes: string(),
  oldBusiness: string(),
  newBusiness: string(),
  additionalNotes: string(),
});
