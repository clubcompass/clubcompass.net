import React, { useState } from "react";
import { ModalProvider } from "../../../../general/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useModalContext } from "../../../../general/Modal";
import { Field as CustomField } from "../../../../general/input/control";

import { AiOutlineCheckCircle } from "react-icons/ai";

export const ChangeEmail = ({ email }) => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <label className="text-gray-500">Email: </label>
        <div className="flex gap-2 items-center">
          <p className="">{email}</p>
          <ModalProvider button={"Edit"} title={"Change email"}>
            <OpenModal />
            <EmailForm email={email} />
            <EmailConfirm />
            <EmailCongrats />
          </ModalProvider>
        </div>
      </div>
    </div>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className="ml-2 py-0.5 px-4 rounded-md bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    >
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
        validationSchema={loginSchema}
      >
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
            className="col-span-2 h-[44px] bg-cc text-white rounded-xl"
          >
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
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                onClick={next}
                className="py-2 bg-cc text-white rounded-xl"
              >
                Confirm
              </button>
              <span
                onClick={prev}
                className="text-center cursor-pointer text-gray-500"
              >
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
        Your email has been successfully changed. Your new email is now active
      </p>
      <div className="mx-auto">
        <button
          onClick={closeModal}
          className="px-8 py-2 text-white bg-cc hover:bg-cc/90 rounded-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
