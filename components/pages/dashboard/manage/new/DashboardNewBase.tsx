import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import { createClubSchema } from "../../../../../server/utils/validation/schemas/club/createClubSchema";
import { GET_TAGS, CREATE_CLUB } from "../../../../../lib/docs";
import {
  DashboardField as CustomField,
  DashboardRadio as CustomRadio,
} from "../components";

export const DashboardNewBase = () => {
  const router = useRouter();

  // const handleSubmitAsDraft = async () => {};

  return (
    <div className="flex flex-col gap-6">
      <Formik
        initialValues={{
          name: "",
          description: "",
          color: "",
          location: "",
          meetingDate: "",
          // tags: [],
        }}
        onSubmit={async (values, { setFieldError }) => {
          console.log(values);
        }}
        // validationSchema={createClubSchema}
      >
        <Form className="grid w-full grid-cols-2 gap-4">
          <Field
            name="name"
            label="Club Name"
            placeholder="Robotics"
            span={1}
            required
            component={CustomField}
          />
          <Field
            name="description"
            label="Description"
            placeholder="Robotics is a club that teaches students how to build robots."
            span={2}
            textarea
            component={CustomField}
          />
          <Field
            component={CustomRadio}
            name="availability"
            label="Availability"
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
            placeholder="A101"
            span={1}
            component={CustomField}
          />
          <Field
            name="meetingDate"
            label="Meeting Date and Time"
            placeholder="Every other Monday at 3:00pm after school"
            span={1}
            component={CustomField}
          />

          <div className="mt-3 flex flex-row items-center gap-3">
            <button className="rounded-md bg-[#F4F4F4] px-9 py-2" type="button">
              Dashboard
            </button>
            {/* should say save as draft when club created */}
            <button
              className="rounded-md bg-cc px-9 py-2 text-white"
              type="submit"
            >
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
