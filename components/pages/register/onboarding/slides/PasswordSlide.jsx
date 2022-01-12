import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Buttons, Header, Container } from "../components";
import { OnboardingForm } from "../components/input/OnboardingForm";
export const PasswordSlide = ({ next, prev, set, data }) => {
  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "What's your password? (We won't look)",
      description:
        "You will need this password to log into your Club Compass account so make sure its something you'll remember.",
    },
    control: [
      {
        label: "Password",
        name: "password",
        type: "password",
        span: 6,
      },
      {
        label: "Confirm Password",
        name: "confirmation",
        type: "password",
        span: 6,
      },
    ],
    buttons: [
      {
        disabled: false,
        primary: false,
        label: "Back",
        type: "function",
        action: prev,
      },
      {
        disabled: false,
        primary: true,
        label: "Continue",
        type: "function",
        action: () => {},
      },
    ],
  };

  const handleSubmission = ({ password, setSubmitting }) => {
    set({
      password: password,
    });
    next();
    setSubmitting(false);
  };

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmation: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  });

  return (
    <Container>
      <Header {...config.header} />
      <div className="w-[495px] flex flex-col gap-3">
        <Formik
          initialValues={{ password: data.password, confirmation: "" }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmission({ password: values.password, setSubmitting });
          }}
          validationSchema={passwordSchema}
        >
          {(props) => {
            return (
              <OnboardingForm
                {...props}
                form={config.control}
                usePaginationAsSubmission={config.usePaginationAsSubmission}
                buttons={config.buttons}
              />
            );
          }}
        </Formik>
      </div>
      {!config.usePaginationAsSubmission && (
        <Buttons buttons={config.buttons} />
      )}
    </Container>
  );
};
