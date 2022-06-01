import type { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { FlexContainer } from "../../../../ui";
import { useManagementContext } from "../../context";
import { ContentContainer } from "../../shared";
import { TextField } from "../../../../ui";

type Props = {};

interface Values {
  name: string;
  email: string;
  location: string;
  meetingDate: string;
  availability: string;
  tags: Array<string>;
}

export const Information: FC<Props> = ({}) => {
  const { clubId, club, saveClubAsDraft, editClub } = useManagementContext();
  return (
    <ContentContainer
      title="Tell us about your club."
      description="We just need some basic information about your club."
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          location: "",
          meetingDate: "",
          availability: "",
          tags: [],
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className="flex w-[622px] flex-col items-start gap-4">
          <FlexContainer row gap={20}>
            <Field
              name="name"
              label="Club Name"
              placeholder="Robotics"
              component={TextField}
            />
            <Field
              name="email"
              label="Club Email"
              placeholder="robotics@gmail.com"
              component={TextField}
            />
          </FlexContainer>

          <FlexContainer>
            <Field
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              textarea
              component={TextField}
            />
          </FlexContainer>

          <FlexContainer row gap={20}>
            <Field
              name="firstName"
              label="First Name"
              placeholder="John"
              component={TextField}
            />
            <Field
              name="firstName"
              label="First Name"
              placeholder="John"
              component={TextField}
            />
          </FlexContainer>

          <button type="submit">Continue</button>
        </Form>
      </Formik>
    </ContentContainer>
  );
};
