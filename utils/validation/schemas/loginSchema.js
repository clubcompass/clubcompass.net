import { object, string, bool } from "yup";

export const loginSchema = object().shape({
  email: string().email("Invalid email.").required("Email field is required."),
  password: string()
    .required("Password field is required.")
    .min(8, "Password must be at least 8 characters."),
  remember: bool()
    .oneOf([true, false], "Must be checked or unchecked")
    .required("Remember me field is required."),
});
