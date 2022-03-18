import { object, string, array, number } from "yup";

export const newUserSchema = object().shape({
  firstname: string()
    .required()
    .test("is-alpha", "Firstname cannot contain numbers.", (value) =>
      /^[a-zA-Z]+$/.test(value)
    ),
  lastname: string()
    .required()
    .test("is-alpha", "Lastname cannot contain numbers.", (value) =>
      /^[a-zA-Z]+$/.test(value)
    ),
  email: string().email("Email must be valid").required(),
  studentId: string().required().max(20), // vague validation on purpose
  password: string()
    .required("Password is required.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, and 1 uppercase, number and special character"
    ),
  grade: string()
    .required("Grade is required.")
    .oneOf(["FRESHMAN", "SOPHMORE", "JUNIOR", "SENIOR"], "Invalid grade."),
  interests: array()
    .optional()
    .of(
      object().shape({
        // id: string().required("Tag id of interest is required."), // change back to string
        id: string().required("Tag id of interest is required."), // change back to string
      })
    ),
});
