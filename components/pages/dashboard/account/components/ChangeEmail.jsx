import React, { useState } from "react";
import { ModalProvider } from "../../../../general/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useModalContext } from "../../../../general/Modal";
import { Field as CustomField } from "../../../../general/input/control";

export const ChangeEmail = ({ email }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <ModalProvider button={"Edit"} title={"Change email"}>
          <OpenModal />
          <EmailForm email={email} />
          <EmailConfirm />
          <EmailCongrats />
        </ModalProvider>
      </div>
    </div>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className="py-0.3 ease ml-2 rounded-md bg-gray-100 px-4 text-gray-600 duration-150 hover:bg-gray-200">
      Edit
    </button>
  );
};

const EmailForm = ({ email }) => {
  const { next } = useModalContext();
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email.")
      .required("Email field is required."),
  });

  const [editEmail, setEditEmail] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-semibold" onClick={next}>
        Update Email
      </h4>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          console.log(values);
          next();
        }} // make actually work
        validationSchema={loginSchema}>
        <Form className="grid grid-cols-8 gap-2">
          <div style={{ gridColumn: "span 6" }}>
            <Field
              id="email"
              name="email"
              label="New email"
              placeholder="example@example.com"
              component={CustomField}
            />
          </div>
          <button
            type="submit"
            className="col-span-2 h-[44px] rounded-xl bg-cc text-white">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const EmailConfirm = () => {
  const { next, prev } = useModalContext();
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-semibold">Confirm Email</h4>
      <div className="flex flex-col gap-1">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={console.log("email updated")} // make actually work
        >
          <Form className="flex flex-col gap-3">
            <div style={{ gridColumn: "span 8" }}>
              <Field
                id="email"
                name="email"
                placeholder="xxx-xxx"
                label="Confirmation code"
                component={CustomField}
              />
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                onClick={next}
                className="rounded-xl bg-cc py-2 text-white">
                Confirm
              </button>
              <span
                onClick={prev}
                className="ease mt-2 cursor-pointer rounded-xl py-1 text-center text-gray-500 duration-150 hover:bg-gray-100">
                Back
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const EmailCongrats = () => {
  const { closeModal } = useModalContext();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xl font-semibold">Success!</h4>
      <p className="text-[#686868]">
        Your email has been successfully changed. Your new email is now active.
      </p>
      <div className="mx-auto">
        <button
          onClick={closeModal}
          className="rounded-lg bg-cc px-8 py-2 text-white">
          Got it!
        </button>
      </div>
    </div>
  );
};
