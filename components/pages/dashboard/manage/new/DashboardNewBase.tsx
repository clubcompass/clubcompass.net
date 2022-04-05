import React, { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import { createClubSchema } from "../../../../../server/utils/validation/schemas/club/createClubSchema";
import { usePaginationContext } from "../components";
import { GET_TAGS, CREATE_CLUB } from "../../../../../lib/docs";
import {
  DashboardField as CustomField,
  DashboardRadio as CustomRadio,
} from "../components";
import { useAuthContext } from "../../../../../context";
import {
  CreateClubArgs,
  CreateClubPayload,
} from "../../../../../server/graphql/club/types";

export const DashboardNewBase = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { next } = usePaginationContext();

  const [createClub] = useMutation<
    { createClub: CreateClubPayload },
    CreateClubArgs
  >(CREATE_CLUB, {
    context: {
      headers: { authorization: `Bearer ${user.token}` },
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmitAsDraft = async ({
    name,
    description,
    availability,
    location,
    meetingDate,
    tags,
  }) => {
    await createClub({
      variables: {
        data: {
          name: name,
          ...(availability && { availability }),
          ...(description && { description }),
          ...(location && { location }),
          ...(meetingDate && { meetingDate }),
          ...(tags && { tags }),
        },
      },
    });
    next();
  };

  return (
    <div className="flex flex-col gap-6">
      <Formik
        initialValues={{
          name: "",
          description: "",
          email: "",
          availability: "",
          location: "",
          meetingDate: "",
          tags: [],
        }}
        onSubmit={async (values, { setFieldError }) => {
          await handleSubmitAsDraft(values);
        }}
        validationSchema={createClubSchema}>
        <Form className="grid w-full grid-cols-2 gap-6">
          <Field
            name="name"
            label="Club Name"
            description="Make it clear, but not too long."
            placeholder="Robotics"
            span={1}
            required
            component={CustomField}
          />
          <Field
            name="description"
            label="Description"
            description="This is how members learn more about your club. Make sure you
              provide enough detail for people to understand what your club is
              all about."
            placeholder="Robotics is a club that teaches students how to build robots."
            span={2}
            textarea
            component={CustomField}
          />
          <Field
            component={CustomRadio}
            name="availability"
            label="Availability"
            description="Open: Anyone can join. Invite Only: Users must request to join
              your club. Closed: Members must be invited by the club to join."
            direction="column"
            options={[
              { label: "Open", value: "OPEN" },
              { label: "Invite Only", value: "INVITE_ONLY" },
              { label: "Closed", value: "CLOSED" },
            ]}
            span={2}
          />
          <Field
            name="location"
            label="Meeting Location"
            description="A room number works best. If it is outside of school, put where meetings are hosted at."
            placeholder="A101"
            span={1}
            component={CustomField}
          />
          <Field
            name="meetingDate"
            label="Meeting Date and Time"
            description="The shorter the better."
            placeholder="Every other Monday at 3:00pm"
            span={1}
            component={CustomField}
          />
          <div className="mt-3 grid w-[380px] grid-cols-2 items-center gap-3">
            <Link href="/dashboard">
              <a className="rounded-md bg-gray-100 px-9 py-2 text-center duration-100 hover:bg-gray-200">
                Dashboard
              </a>
            </Link>
            {/* should say save as draft when club created */}
            <button
              className="rounded-md bg-cc px-9 py-2 text-white duration-100 hover:bg-ccDark"
              type="submit">
              Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>

    // <div className="flex flex-col gap-6">
    //   <div className="flex flex-col gap-2">
    //     <h2 className="text-lg font-bold">Tell us about your new club.</h2>
    //     <p className="text-sm text-[#5D5E5E]">
    //       This information will be displayed on your club page and card.
    //     </p>
    //   </div>
    //   <Formik
    //     initialValues={
    //       initialValues || {
    //         name: "",
    //         email: "",
    //         description: "",
    //         meetingDate: "",
    //         location: "",
    //         tags: [],
    //       }
    //     }
    //     onSubmit={async (values, { setFieldError }) => {
    //       console.log(values);
    //       // try {
    //       //   await createClub({
    //       //     variables: {
    //       //       data: {
    //       //         ...values,
    //       //         tags: values.tags.map((tag) => ({ id: tag.id })),
    //       //         availability: availability.toUpperCase().replace(/ /g, "_"),
    //       //       },
    //       //     },
    //       //   });
    //       //   // router.push("/dashboard/manage/clubs");
    //       // } catch (e) {
    //       //   // check for type of error
    //       //   // validate per field
    //       //   console.log(e);
    //       //   console.log(error);
    //       //   // console.log(error);
    //       //   // setFieldError("name", error.message);
    //       //   // setFieldError("general", error.message);
    //       // }
    //       next();
    //     }}
    //     validationSchema={createClubSchema}
    //   >
    //     {({ values, setFieldValue, handleChange }) => {
    //       return (
    //         <Form className="flex max-w-3xl flex-col gap-4">
    //           {form.map((field, i) => (
    //             <div key={i} className="flex flex-col">
    //               {field.custom ? (
    //                 <div
    //                   key={field.name}
    //                   style={{ gridColumn: `span ${field.span}` }}
    //                   className="flex"
    //                 >
    //                   {field.component}
    //                 </div>
    //               ) : (
    //                 <Field {...field} value={values[field.name]} />
    //               )}
    //               <p className="pl-2 text-xs text-gray-500">
    //                 {field.description}
    //               </p>
    //             </div>
    //           ))}
    //           <div className="flex flex-col gap-2">
    //             <label htmlFor="tags" className="font-medium">
    //               Select Club Related Tags
    //             </label>
    //             <TagSelection
    //               tags={tags}
    //               loading={tagsLoading}
    //               error={tagError}
    //               initial={values.tags}
    //               set={(selected) => handleChange("tags", selected)}
    //               limit={4}
    //             />
    //             <p className="text-xs text-gray-500">
    //               Select up to 4 tags that best represent your club. These tags
    //               will help interested students find your club.
    //             </p>
    //           </div>
    //           <div className="flex w-3/4 flex-row items-center gap-2">
    //             <FieldButton
    //               label="Exit"
    //               onClick={() => router.push("/dashboard")}
    //             />
    //             <FieldButton primary label="Continue" type="submit" />
    //           </div>
    //         </Form>
    //       );
    //     }}
    //   </Formik>
    // </div>
  );
};
