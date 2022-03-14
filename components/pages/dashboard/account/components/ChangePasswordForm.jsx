import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updatePassword } from "../../../../../lib/auth";
import {
  Modal,
  ModalProvider,
  useModalContext,
} from "../../../../general/Modal";
import { Field as CustomField } from "../../../../general/input/control";
import { ValidatePassword } from "../../../register/onboarding/slides";

export const ChangePasswordModal = ({ id }) => {
  return (
    <div>
      <ModalProvider
        button={"Change Password"}
        buttonClass={"py-2 px-4 bg-red-400 text-white rounded-md"}
        title={"Change Password"}
      >
        <OpenModal />
        <ChangePasswordForm id={id} />
        <ChangePasswordConfirm />
      </ModalProvider>
    </div>
  );
};

const OpenModal = () => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className="py-1 px-4 rounded-md bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 duration-150 ease"
    >
      Change Password
    </button>
  );
};

const ChangePasswordForm = ({ id }) => {
  const { closeModal, next } = useModalContext();

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Must contain at least 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain an lowercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[!@#$%^&*()\-_=+{};:,<.>]/, "Must contain a special character"),
    confirmation: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  });

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-semibold" onClick={next}>
        Change Password
      </h4>
      <Formik
        initialValues={{
          password: "",
          confirmation: "",
        }}
        onSubmit={async (values, { setFieldError }) => {
          const { error } = await updatePassword({
            user_id: id,
            password: values.password,
          });
          console.log(error);
          if (error) {
            return setFieldError("password", error);
          }
          console.log("Password updated"); // handle this
          next();
        }}
        validationSchema={passwordSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-1">
            <div className="flex flex-col gap-4">
              <Field
                id="password"
                type="password"
                name="password"
                label="New password "
                component={CustomField}
              />
              <Field
                id="confirmation"
                type="password"
                name="confirmation"
                label="Confirm password"
                component={CustomField}
              />
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-cc text-white mt-2"
              >
                Submit
              </button>
              <span
                onClick={closeModal}
                className="cursor-pointer text-center text-gray-500 duration-150 ease hover:bg-gray-100 py-1 rounded-xl mt-2"
              >
                Cancel
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ChangePasswordConfirm = () => {
  const { closeModal } = useModalContext();

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xl font-semibold">Success!</h4>
      <p className="text-[#686868]">
        Your password has been successfully changed. Your new password is now
        active.
      </p>
      <div className="mx-auto">
        <button
          onClick={closeModal}
          className="px-6 py-2 text-white bg-cc rounded-xl"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
