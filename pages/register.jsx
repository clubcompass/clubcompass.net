import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useAuth } from "../context/auth";

import {
  AuthField,
  FormWrapper,
  FormButton,
  Graphic,
} from "../components/auth";

const Register = () => {
  return (
    <RegistrationContainer>
      <RegistrationForm />
      <Graphic />
    </RegistrationContainer>
  );
};

export default Register;

const RegistrationContainer = ({ children }) => (
  <div className="flex flex-row w-full">
    <div className="flex w-full h-screen items-center justify-center">
      {children[0]}
    </div>
    <div className="hidden md:block h-screen w-full">{children[1]}</div>
  </div>
);

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must contain 1 uppercase, number, special character"
      ),
    passwordConfirmation: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  async function onSubmit(values) {
    setLoading(true);
    const { email, password, firstName, lastName } = values;

    const { error } = await signUp({ email, password });

    if (error) {
      setLoading(false);
      alert(error.message, error.status);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="relative w-full mx-6 lg:mx-0 lg:w-4/6 flex flex-col">
      <div className="w-full flex flex-col">
        <div className="!mx-0 mb-6">
          <Link href="/">
            <a>
              <Image src="/cc-auth.svg" alt="auth" width={40} height={40} />
            </a>
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold mb-2">Register</h1>
        <p className="w-full md:w-[70%] mb-3 font-medium text-[#797D83]">
          Create a Club Compass account to discover and join clubs!
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
        }}
      >
        <Form className="w-full">
          <FormWrapper>
            <div className="flex flex-row items-center w-full gap-4">
              <AuthField
                label={{ label: "First name", htmlFor: "firstName" }}
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <AuthField
                label={{ label: "Last name", htmlFor: "lastName" }}
                name="lastName"
                type="text"
                placeholder="Last name"
              />
            </div>
            <AuthField
              label={{ label: "Email Address", htmlFor: "email" }}
              name="email"
              type="text"
              placeholder="Email"
            />

            <div className="flex flex-row items-center w-full gap-4">
              <AuthField
                label={{ label: "Password", htmlFor: "password" }}
                name="password"
                type="password"
                placeholder="Password"
              />
              <AuthField
                label={{
                  label: "Confirm password",
                  htmlFor: "passwordConfirmation",
                }}
                name="passwordConfirmation"
                type="password"
                placeholder="Confirm password"
              />
            </div>

            <FormButton text="Register" loading={loading} />
          </FormWrapper>
        </Form>
      </Formik>
      <p className="font-medium mt-6">
        Already have an account?{" "}
        <Link href="/login">
          <a className="text-cc">Login</a>
        </Link>
      </p>
      <p className="absolute -bottom-12 font-medium text-xs">
        Having trouble?{" "}
        <Link href="/contact">
          <a className="text-cc">Contact the team</a>
        </Link>
      </p>
    </div>
  );
};
