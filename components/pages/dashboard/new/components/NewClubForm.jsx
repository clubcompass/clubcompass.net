import React, { useState } from "react";
import { useQuery } from "react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { db } from "../../../../../lib/database";
import {
  TextField,
  FieldSelect as Select,
} from "../../../../../components/general/input/control";

export const NewClubForm = () => {
  //! Need to check which users selected to filter them out of the list of users
  //# get email from user, set president to user

  const { data: users, userError } = useQuery(
    "users",
    async () => await db.users.get({ all: true }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: tags, error: tagError } = useQuery(
    "tags",
    async () => await db.tags.get(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: teachers, teachersError } = useQuery(
    "teachers",
    async () => await db.users.get({ type: "TEACHER" }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const userOptions =
    users &&
    users.map(({ id, firstname, lastname }) => ({
      value: id,
      label: `${firstname} ${lastname}`,
    }));

  const tagOptions =
    tags &&
    tags.map(({ id, name }) => ({
      value: id,
      label: name,
    }));

  const teacherOptions =
    teachers &&
    teachers.map(({ id, firstname, lastname }) => ({
      value: id,
      label: `${firstname} ${lastname}`,
    }));

  console.log(userOptions, tagOptions);

  const form = [
    {
      component: TextField,
      name: "name",
      label: {
        text: "Club Name",
        required: true,
      },
      placeholder: "Paul's Club",
    },
    {
      //TODO: Rich text editor with md supported
      component: TextField,
      name: "description",
      label: {
        text: "Club Description",
        required: true,
      },
      placeholder: "A club for people who like to play games",
      textarea: true,
    },
    {
      component: TextField,
      name: "meetingData",
      label: {
        text: "Club Meeting Date",
        required: true,
      },
      placeholder: "Your club's meeting date",
    },

    {
      //TODO: Selection for zoom or room; if zoom, add zoom link if room add room number
      component: TextField,
      name: "location",
      label: {
        text: "Meeting location",
        required: true,
      },
      placeholder: "The place where your club meets",
    },
    {
      component: Select,
      name: "vicePresident",
      label: {
        text: "Select a vice president for your club",
        required: true,
      },
      props: {
        name: "vicePresident",
        options: userOptions,
      },
    },
    {
      component: Select,
      name: "secretary",
      label: {
        text: "Select a secretary for your club",
        required: true,
      },
      props: {
        name: "secretary",
        options: userOptions,
      },
    },
    {
      component: Select,
      name: "treasurer",
      label: {
        text: "Select a treasurer for your club",
        required: true,
      },
      props: {
        name: "treasurer",
        options: userOptions,
      },
    },
    {
      component: Select,
      name: "memberIds",
      label: {
        text: "Select at least 10 members for your club",
        required: true,
      },
      props: {
        isMulti: true,
        max: 20,
        name: "memberIds",
        options: userOptions,
      },
    },
    {
      component: Select,
      name: "tagIds",
      label: {
        text: "Select up to 4 tags for your club",
        required: true,
      },
      props: {
        isMulti: true,
        max: 4,
        name: "tagIds",
        options: tagOptions,
      },
    },
    {
      component: Select,
      name: "teacher",
      label: {
        text: "Choose a teacher for your club",
        required: true,
      },
      props: {
        name: "teacher",
        options: teacherOptions,
      },
    },

    // purpose,
    // membershipRequirements,
    // dutiesOfMembers,
    // titlesAndDutiesOfOfficers,
    // selectionOfOfficers,
    // officerMinimumGPA,
    // percentAttendanceForOfficialMeeting,
    // percentAttendanceToApproveDecision,
  ];

  // const passwordSchema = Yup.object().shape({
  //   password: Yup.string()
  //     .required("Please enter your password")
  //     .min(8, "Must contain at least 8 characters")
  //     .matches(/[A-Z]/, "Must contain an uppercase letter")
  //     .matches(/[a-z]/, "Must contain an lowercase letter")
  //     .matches(/[0-9]/, "Must contain a number")
  //     .matches(/[!@#$%^&*()\-_=+{};:,<.>]/, "Must contain a special character"),
  //   confirmation: Yup.string()
  //     .required("Please confirm your password")
  //     .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  // });

  const handleSubmitAsFinal = async () => {};
  // TODO: finish all fields, add validation for all fields, submit methods with ss validation
  const handleSubmitAsDraft = async () => {};

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        meetingDate: "",
        location: "",
        vicePresident: "",
        secretary: "",
        treasurer: "",
        memberIds: [],
        tagIds: [],
        teacher: "",
      }}
      onSubmit={async (values, { setFieldError }) => {
        const data = { ...values };
        console.log(data);
      }}
      // validationSchema={passwordSchema}
    >
      <Form className="flex max-w-3xl flex-col gap-4">
        {form.map((field, z) => (
          <Field key={z} {...field} z={50 - z} />
        ))}
        <div className="flex flex-row items-center gap-2">
          <button type="submit" className="w-full py-1 bg-cc text-white mt-2">
            Submit
          </button>
          <button
            type="button"
            className="w-full py-1 bg-yellow-600 text-white mt-2"
          >
            Save As Draft
          </button>
        </div>
      </Form>
    </Formik>
  );
};
