import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { Buttons, Header, Container } from "../components";
import { OnboardingForm } from "../components/input/OnboardingForm";
import { CHECK_STUDENT_ID } from "../../../../../lib/docs";
export const StudentIdSlide = ({ next, prev, set, data }) => {
  const [error, setError] = useState(false);

  const [checkStudentId, { loading }] = useLazyQuery(CHECK_STUDENT_ID, {
    onError: (e) => {
      if (e?.graphQLErrors[0]?.extensions?.code === "UNAUTHENTICATED")
        setError(true);
    },
  });

  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "Whats your Del Norte Student ID?",
      description:
        "Club Compass requires your Student ID to ensure you attend Del Norte.",
    },
    control: {
      id: {
        label: "Student ID",
        name: "id",
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
        loading: loading,
        primary: true,
        label: "Continue",
        type: "function",
        action: () => {},
      },
    ],
  };

  const handleStudentIdSubmission = async ({ id }) => {
    await checkStudentId({ variables: { studentId: id } });
    set({
      studentId: id,
    });
    next();
  };

  return (
    <Container>
      <Header {...config.header} />
      <div className="w-[495px] flex flex-col gap-3">
        <Formik
          initialValues={{ id: data.studentId }}
          onSubmit={({ id }) => {
            handleStudentIdSubmission({ id });
          }}
          validationSchema={Yup.object().shape({
            id: Yup.string().required().max(20),
          })}
        >
          {(props) => {
            return (
              <OnboardingForm
                {...props}
                form={config.control.id}
                usePaginationAsSubmission={config.usePaginationAsSubmission}
                buttons={config.buttons}
              />
            );
          }}
        </Formik>
      </div>
      {error && (
        <p className="text-red-500 text-sm">
          An account with this Student ID address already exists.{" "}
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
