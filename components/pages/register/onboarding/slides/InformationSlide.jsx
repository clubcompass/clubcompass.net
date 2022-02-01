import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Buttons, Header, Container } from "../components";
import { OnboardingForm } from "../components/input/OnboardingForm";
import { OptionSelection } from "../../../../general/input";
export const InformationSlide = ({ next, prev, set, data }) => {
  const [grade, setGrade] = useState(data.grade);
  //# Make OptionSelection an Onboarding option
  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "Who are you?",
      description:
        "To help identify users, Club Compass uses first and last names and not customized usernames.",
    },

    control: [
      {
        option: "field",
        label: "First Name",
        name: "firstname",
        type: "text",
        span: 3,
      },
      {
        option: "field",
        label: "Last Name",
        name: "lastname",
        type: "text",
        span: 3,
      },
      {
        custom: true,
        name: "grade",
        component: (
          <OptionSelection
            setCurrent={({ value }) => setGrade(value)}
            current={grade}
            options={["Freshman", "Sophomore", "Junior", "Senior"]}
          />
        ),
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

  const handleSubmission = ({ firstname, lastname, setSubmitting }) => {
    set({
      firstname: firstname,
      lastname: lastname,
      grade: grade,
    });
    next();
    setSubmitting(false);
  };

  const informationSchema = Yup.object().shape({
    firstname: Yup.string().required("Please provide a first name."),
    lastname: Yup.string().required("Please provide a last name."),
  });

  return (
    <Container>
      <Header {...config.header} />
      <div className="w-[495px] flex flex-col gap-3">
        <Formik
          initialValues={{
            firstname: data.firstname,
            lastname: data.lastname,
            grade: data.grade,
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmission({
              ...values,
              setSubmitting,
            });
          }}
          validationSchema={informationSchema}
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
