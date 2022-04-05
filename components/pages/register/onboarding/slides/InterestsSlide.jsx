import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Buttons, Header, Container } from "../components";
import { TagSelection } from "../../../../general/input";
import { OnboardingForm } from "../components/input/OnboardingForm";
export const InterestsSlide = ({ next, prev, tagInfo, set, data }) => {
  const [selectedTags, setSelectedTags] = useState(data.interests);
  // TODO: fix this
  const { tags, tagsLoading, tagError } = tagInfo;
  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "What subject(s) interests you?",
      description:
        "You can choose up to 4 interests to help Club Compass filter and find clubs just for you.",
    },

    control: {
      tags: {
        custom: true,
        name: "tags",
        component: (
          <TagSelection
            tags={tags}
            loading={tagsLoading}
            error={tagError}
            initial={selectedTags}
            limit={4}
          />
        ),
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
        disabled: false,
        primary: true,
        label: "Continue",
        type: "function",
        action: () => {},
      },
    ],
  };

  return (
    <Container>
      <Header {...config.header} />
      <Formik
        initialValues={{
          tags: data.interests,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          set({
            interests: values.tags,
          });
          next();
          // handleSubmission({
          //   ...values,
          //   setSubmitting,
          // });
        }}
        // validationSchema={informationSchema}
      >
        {(props) => {
          return (
            <OnboardingForm
              {...props}
              form={config.control.tags}
              usePaginationAsSubmission={config.usePaginationAsSubmission}
              buttons={config.buttons}
            />
          );
        }}
      </Formik>
      {!config.usePaginationAsSubmission && (
        <Buttons buttons={config.buttons} />
      )}
      {/* <Buttons buttons={config.buttons} asSubmission={true} /> */}
    </Container>
  );
};
