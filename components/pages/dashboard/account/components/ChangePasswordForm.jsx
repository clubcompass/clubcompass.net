import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updatePassword } from "../../../../../lib/auth";

export const ChangePasswordForm = ({ id }) => {
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Must contain at least 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain an lowercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[!@#$%^&*()\-_=+{};:,<.>]/, "Must contain a special character"),
    confirmation: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  });

  return (
    <Formik
      initialValues={{
        password: "",
        confirmation: "",
      }}
      onSubmit={async (values, { setFieldError }) => {
        const { error } = await updatePassword({
          user_id: id,
          password: values.password,
        });
        console.log(error);
        if (error) {
          return setFieldError("password", error);
        }
        console.log("Password updated"); // handle this
      }}
      validationSchema={passwordSchema}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col">
          <label htmlFor="password">Password: </label>
          <Field
            id="password"
            name="password"
            placeholder="Password"
            className="border border-black"
            type="text"
          />
          {errors.password && touched.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
          <label htmlFor="password">Confirm: </label>
          <Field
            id="confirmation"
            name="confirmation"
            placeholder="Confirm Password"
            className="border border-black"
            type="text"
          />
          {errors.confirmation && touched.confirmation && (
            <div className="text-red-500">{errors.confirmation}</div>
          )}
          <button
            type="submit"
            className="w-full py-1 bg-black text-white mt-2"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
