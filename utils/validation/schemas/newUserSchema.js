import { object, string, array } from "yup";

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
  password: string("Password must be a string.")
    .required("Password is required.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, and 1 uppercase, number and special character"
    ),
  grade: string("Grade must be a string.")
    .required("Grade is required.")
    .oneOf(["Freshman", "Sophomore", "Junior", "Senior"], "Invalid grade."),
  interests: array()
    .optional()
    .of(
      object().shape({
        id: string("Tag id of interest must be string.").required(
          "Tag id of interest is required."
        ),
        name: string("Tag name of interest must be string.").required(
          "Tag name of interest is required."
        ),
      })
    ),
});
