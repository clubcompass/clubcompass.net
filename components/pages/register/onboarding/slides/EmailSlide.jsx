import React, { useState } from "react";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLazyQuery } from "@apollo/client";
import { useToastContext } from "../../../../../context";
import { Buttons, Header, Container } from "../components";
import { OnboardingForm } from "../components/input/OnboardingForm";
import { CHECK_EMAIL } from "../../../../../lib/docs";
export const EmailSlide = ({ next, prev, set, data }) => {
  const { addToast } = useToastContext();
  const [loading, setLoading] = useState(false);

  const [checkEmail, { error }] = useLazyQuery(CHECK_EMAIL); // loading and handling

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

  const handleEmailSubmission = async ({
    email,
    setSubmitting,
    setFieldError,
  }) => {
    setLoading(true);
    try {
      await checkEmail({ variables: { email } });
      set({
        email,
      });
      next();
    } catch (e) {
      if (e?.graphQLErrors[0]?.extensions?.code === "UNAUTHENTICATED") {
        setFieldError("email", e.message);
      } else {
        addToast({
          type: "error",
          title: "Error",
          message: "Something went wrong, please try again.",
          duration: 3000,
        });
        setFieldError("email", "something went wrong");
      }
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
      <div className="flex flex-col gap-3">
        <Formik
          initialValues={{ email: data.email }}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            // check email
            console.log(values.email);
            handleEmailSubmission({
              email: values.email,
              setSubmitting,
              setFieldError,
            });
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
      {!config.usePaginationAsSubmission && (
        <Buttons buttons={config.buttons} />
      )}
    </Container>
  );
};
