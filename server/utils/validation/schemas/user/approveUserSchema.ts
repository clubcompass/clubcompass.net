import { object, string } from "yup";

export const approveUserSchema = object().shape({
  userId: string()
    .required("user id field is required")
    .min(25, "userId length not valid"),
});
