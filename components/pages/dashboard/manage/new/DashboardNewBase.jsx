import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { createClubSchema } from "../../../../../server/utils/validation/schemas/club/createClubSchema";
import { useRouter } from "next/router";
import { GET_TAGS, CREATE_CLUB } from "../../../../../lib/docs";
import {
  FieldButton,
  Field as CustomField,
  FieldSelect as Select,
} from "../../../../general/input/control";
import { OptionSelection, TagSelection } from "../../../../general/input";

export const DashboardNewBase = ({ next, prev, initialValues }) => {
  const [availability, setAvailability] = useState("Open"); // move to formik field updates
  const router = useRouter();

  const [createClub, { loading, error }] = useMutation(CREATE_CLUB, {
    onCompleted: (data) => {
      console.log(data);
      next();
    },
    // onError: (error) => {
    //   console.log(error);
    // },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: { getTags: tags } = {},
    loading: { tagsLoading },
    error: { tagError } = {},
  } = useQuery(GET_TAGS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  const form = [
    {
      component: CustomField,
      name: "name",
      label: "Club Name",
      description:
        "Enter your club's name, try to keep it concise. For example, the school name is not necessary to include in the name of your club.",
    },
    {
      component: CustomField,
      name: "email",
      label: "Email",
      description:
        "Enter an email that you frequently check. This is the email through which ASB and other students will be able to contact you through.",
    },
    {
      //TODO: Rich text editor with md supported
      component: CustomField,
      name: "description",
      label: "Club Description",
      textarea: true,
      description:
        "Enter a detailed description of your club. This will be seen by other students on your club’s preview card as well as on your club’s page.",
    },
    {
      custom: true,
      name: "availability",
      component: (
        <OptionSelection
          setCurrent={({ value }) => setAvailability(value)}
          current={availability}
          options={["Open", "Invite Only", "Closed"]}
        />
      ),
      span: 6,
      description:
        "Open: Anyone is able to join your club Invite Only: You can send invites to other students to join your club, and other students can send invites to your club to request joining your club.Closed: You will be able to invite other people to join you club, but nobody will be able to join or request to join your club.",
    },
    {
      component: CustomField,
      name: "location",
      label: "Meeting location",
      description:
        "Enter a room number, or another location. Ex: A101, Zoom Meeting, Discord Call",
    },
    {
      component: CustomField,
      name: "meetingDate",
      label: "Meeting Date and Time",
      description:
        "Enter a day or multiple days of the week and the time that your club meets on a regular basis. Try to keep this short. Ex: Every other monday at 3:00pm after school.",
    },
  ];

  // TODO: finish all fields, add validation for all fields, submit methods with ss validation
  // const handleSubmitAsDraft = async () => {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Tell us about your new club.</h2>
        <p className="text-sm text-[#5D5E5E]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
          malesuada turpis.
        </p>
      </div>
      <Formik
        initialValues={
          initialValues || {
            name: "",
            email: "",
            description: "",
            meetingDate: "",
            location: "",
            tags: [],
          }
        }
        onSubmit={async (values, { setFieldError }) => {
          console.log(values);
          // try {
          //   await createClub({
          //     variables: {
          //       data: {
          //         ...values,
          //         tags: values.tags.map((tag) => ({ id: tag.id })),
          //         availability: availability.toUpperCase().replace(/ /g, "_"),
          //       },
          //     },
          //   });
          //   // router.push("/dashboard/manage/clubs");
          // } catch (e) {
          //   // check for type of error
          //   // validate per field
          //   console.log(e);
          //   console.log(error);
          //   // console.log(error);
          //   // setFieldError("name", error.message);
          //   // setFieldError("general", error.message);
          // }
          next();
        }}
        validationSchema={createClubSchema}
      >
        {({ values, setFieldValue, handleChange }) => {
          return (
            <Form className="flex max-w-3xl flex-col gap-4">
              {form.map((field, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {field.custom ? (
                    <div
                      key={field.name}
                      style={{ gridColumn: `span ${field.span}` }}
                      className="flex"
                    >
                      {field.component}
                    </div>
                  ) : (
                    <Field {...field} value={values[field.name]} />
                  )}
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label htmlFor="tags" className="font-medium">
                  Select Club Related Tags
                </label>
                <TagSelection
                  tags={tags}
                  loading={tagsLoading}
                  error={tagError}
                  initial={values.tags}
                  set={(selected) => handleChange("tags", selected)}
                  limit={4}
                />
                <p className="text-xs text-gray-500">
                  Select up to 4 tags that you feel would best represent the
                  topics that relate to your club. These are the tags that will
                  be displayed on your club’s preview card.
                </p>
              </div>
              <div className="flex w-3/4 flex-row items-center gap-2">
                <FieldButton
                  label="Exit"
                  onClick={() => router.push("/dashboard")}
                />
                <FieldButton primary label="Continue" type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
