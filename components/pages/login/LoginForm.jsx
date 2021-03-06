import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Field as CustomField,
  FieldButton,
  FieldCheckbox,
} from "../../general/input/control";
import Link from "next/link";
export const LoginForm = ({ handleSubmission, serverSideError }) => {
  const forms = [
    {
      label: "Email",
      name: "email",
      type: "text",
      span: 6,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      span: 6,
    },
  ];

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email.")
      .required("Email field is required."),
    password: Yup.string()
      .required("Password field is required.")
      .min(8, "Password must be at least 8 characters."),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", remember: false }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmission({ setSubmitting, ...values });
      }}
      validationSchema={loginSchema}
    >
      {({ handleChange, handleBlur, values, setFieldValue, isSubmitting }) => (
        <Form className="grid w-full grid-cols-6 gap-3">
          <React.Fragment>
            {forms.map((form) => (
              <div key={form.name} style={{ gridColumn: `span ${form.span}` }}>
                <Field
                  label={form.label}
                  id={`${form.name}-input`}
                  name={form.name}
                  type={form.type}
                  component={CustomField}
                  value={values[form.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            ))}

            <div className="col-span-6 mt-0 mb-4 flex flex-row items-center justify-between">
              <FieldCheckbox
                isChecked={values["remember"]}
                toggleChecked={() =>
                  setFieldValue("remember", !values["remember"])
                }
              />
              <Link href="/account/recovery">
                <a className="col-span-3 text-sm font-medium text-cc">
                  Forgot password?
                </a>
              </Link>
            </div>

            {serverSideError && (
              <div className="col-span-6 -mt-4 text-xs text-red-500">
                {serverSideError}
              </div>
            )}

            <div className="col-span-6">
              <FieldButton
                primary
                type="submit"
                label="Login"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </div>
          </React.Fragment>
        </Form>
      )}
    </Formik>
  );
};
