import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const CcIdForm = () => {
  return (
    <Formik
      initialValues={{ ccid: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}>
      <Form className="grid grid-cols-8 gap-2">
        <div className="col-span-6">
          <Field id="ccid" name="ccid" label="ccid" placeholder="ABCDEF" />
        </div>
        <button
          type="submit"
          className="col-span-2 h-[44px] rounded-xl bg-cc text-white">
          Send
        </button>
      </Form>
    </Formik>
  );
};
