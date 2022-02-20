import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Buttons,
  Header,
  Container,
} from "../../register/onboarding/components";
import { OnboardingForm } from "../../register/onboarding/components/input/OnboardingForm";
export const ResetSlide = ({ prev, data, handlePasswordReset, error }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "Create a new password",
      description: "Make sure your password is secure and memorable.",
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
        loading: loading,
        action: async () => {
          setLoading(true);
          await handlePasswordReset({ password: password });
          setLoading(false);
        },
      },
    ],
  };

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
    <Container>
      <Header {...config.header} />
      <div className="w-[495px] flex flex-col gap-3">
        <ValidatePassword password={password} />
        <Formik
          initialValues={{ password: data.password, confirmation: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
          }}
          validationSchema={passwordSchema}
        >
          {(props) => {
            setPassword(props.values.password);
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!config.usePaginationAsSubmission && (
        <Buttons buttons={config.buttons} />
      )}
    </Container>
  );
};

const ValidatePassword = ({ password }) => {
  const [passes, setPassing] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const passes = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()\-_=+{};:,<.>]/.test(password),
    };
    setPassing(passes);
  }, [password]);

  const Pass = () => <div className="bg-green-500 h-2 w-2 rounded-full" />;

  const Fail = () => <div className="bg-red-500 h-2 w-2 rounded-full" />;

  return (
    <div className="w-full flex flex-row items-center gap-4">
      <div className="flex flex-row items-center gap-2">
        {passes.length ? <Pass /> : <Fail />}
        <p className="text-sm text-gray-600">8 characters</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        {passes.uppercase ? <Pass /> : <Fail />}
        <p className="text-sm text-gray-600">1 uppercase</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        {passes.lowercase ? <Pass /> : <Fail />}
        <p className="text-sm text-gray-600">1 lowercase</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        {passes.number ? <Pass /> : <Fail />}
        <p className="text-sm text-gray-600">1 number</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        {passes.special ? <Pass /> : <Fail />}
        <p className="text-sm text-gray-600">1 special</p>
      </div>
    </div>
  );
};
