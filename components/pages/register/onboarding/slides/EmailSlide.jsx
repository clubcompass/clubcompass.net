import React, { useState } from "react";
import { AuthenticationError } from "apollo-server-micro";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLazyQuery } from "@apollo/client";
import { Buttons, Header, Container } from "../components";
import { OnboardingForm } from "../components/input/OnboardingForm";
import { CHECK_EMAIL } from "../../../../../lib/docs";
import { RiErrorWarningFill } from "react-icons/ri";
export const EmailSlide = ({ next, prev, set, data }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [checkEmail, { loading: checkLoading, error: checkError }] =
    useLazyQuery(CHECK_EMAIL);

  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "What is your email address?",
      description:
        "Club Compass requires you to have a valid email address to prevent spamming of account creation.",
    },
    control: {
      email: {
        label: "Email",
        name: "email",
        type: "text",
        span: 6,
      },
    },
    buttons: [
      {
        disabled: false,
        primary: false,
        label: "Back",
        type: "function",
        action: prev,
      },
      {
        disabled: loading,
        primary: true,
        loading: loading,
        label: "Continue",
        type: "function",
        action: () => {},
      },
    ],
  };

  const handleEmailSubmission = async ({ email, setSubmitting }) => {
    setLoading(true);
    setError(false);
    console.log(email);
    try {
      await checkEmail({ variables: { email } });
      set({
        email,
      });
      next();
    } catch (e) {
      // console.log(JSON.stringify(e.graphQLErrors));
      if (e?.graphQLErrors[0]?.extensions?.code === "UNAUTHENTICATED")
        setError(true);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Header {...config.header} />
      {/* <div className="flex flex-row items-center text-black">
        <RiErrorWarningFill />
        <span>
          Please ensure you are not using your powayusd email, you will need to
          verify this email
        </span>
      </div> */}
      <div className="w-[495px] flex flex-col gap-3">
        <Formik
          initialValues={{ email: data.email }}
          onSubmit={(values, { setSubmitting }) => {
            // check email
            console.log(values.email);
            handleEmailSubmission({ email: values.email, setSubmitting });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
          })}
        >
          {(props) => {
            return (
              <OnboardingForm
                {...props}
                form={config.control.email}
                usePaginationAsSubmission={config.usePaginationAsSubmission}
                buttons={config.buttons}
              />
            );
          }}
        </Formik>
      </div>
      {error && (
        <p className="text-red-500 text-sm">
          An account with this email address already exists,{" "}
          <Link href="/login">
            <a className="text-cc underline">Login.</a>
          </Link>
        </p>
      )}
      {!config.usePaginationAsSubmission && (
        <Buttons buttons={config.buttons} />
      )}
    </Container>
  );
};
