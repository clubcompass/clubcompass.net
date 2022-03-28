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
      description: "Enter your club's name.",
    },
    {
      component: CustomField,
      name: "email",
      label: "Email",
      description:
        "Enter an email that you frequently check. This email will be used by ASB and other students to contact you.",
    },
    {
      //TODO: Rich text editor with md supported
      component: CustomField,
      name: "description",
      label: "Club Description",
      textarea: true,
      description:
        "Enter a detailed description of your club. This is how students can learn more about your club.",
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
      // description: { avalibility },
      description:
        availability === "Open"
          ? "Open: Anyone can join."
          : availability === "Invite Only"
          ? "Invite Only: Students must request to join or be invited to your club."
          : "Closed: Students must be invited to join your club.",
    },
    {
      component: CustomField,
      name: "location",
      label: "Meeting location",
      description:
        "Enter a room number or another location. Ex: A101, Zoom Meeting, Discord Call",
    },
    {
      component: CustomField,
      name: "meetingDate",
      label: "Meeting Date and Time",
      description:
        "Enter the times your club meets on a regular basis. Try to keep this short. Ex: Every other monday at 3:00pm after school.",
    },
  ];

  // TODO: finish all fields, add validation for all fields, submit methods with ss validation
  // const handleSubmitAsDraft = async () => {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Tell us about your new club.</h2>
        <p className="text-sm text-[#5D5E5E]">
          This information will be displayed on your club page and card.
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
        validationSchema={createClubSchema}>
        {({ values, setFieldValue, handleChange }) => {
          return (
            <Form className="flex max-w-3xl flex-col gap-4">
              {form.map((field, i) => (
                <div key={i} className="flex flex-col">
                  {field.custom ? (
                    <div
                      key={field.name}
                      style={{ gridColumn: `span ${field.span}` }}
                      className="flex">
                      {field.component}
                    </div>
                  ) : (
                    <Field {...field} value={values[field.name]} />
                  )}
                  <p className="pl-2 text-xs text-gray-500">
                    {field.description}
                  </p>
                </div>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <label htmlFor="tags" className="font-semibold">
                  Select Club Related Tags
                </label>
                <div className="flex flex-col gap-1">
                  <div className="rounded-xl border-2 px-6 py-5">
                    <TagSelection
                      tags={tags}
                      loading={tagsLoading}
                      error={tagError}
                      initial={values.tags}
                      set={(selected) => handleChange("tags", selected)}
                      limit={4}
                    />
                  </div>
                  <p className="pl-2 text-xs text-gray-500">
                    Select up to 4 tags that best represent your club. These
                    tags will help interested students find your club.
                  </p>
                </div>
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
