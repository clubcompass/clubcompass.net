import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useAuth } from "../context/auth";

import {
  AuthField,
  FormWrapper,
  FormButton,
  Graphic,
} from "../components/auth";

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm />
      <Graphic />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = ({ children }) => (
  <div className="flex flex-row w-full">
    <div className="flex w-full h-[100vh] items-center justify-center">
      {children[0]}
    </div>
    <div className="hidden md:block h-[100vh] w-full">{children[1]}</div>
  </div>
);

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required("No password provided").min(8),
  });

  const initialValues = {
    remember: false,
    email: "",
    password: "",
  };

  async function onSubmit(values) {
    setLoading(true);
    const { email, password, remember } = values;

    const { error } = await signIn({ email, password });

    if (error) {
      setLoading(false);
      alert(error.message, error.status);
    } else {
      router.push("/dashboard");
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
        <h1 className="text-4xl font-extrabold mb-2">Login</h1>
        <p className="w-full md:w-[70%] mb-3 font-medium text-[#797D83]">
          Log in to Club Compass to see and manage your clubs!
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
            <AuthField
              label={{ label: "Email Address", htmlFor: "email" }}
              name="email"
              type="text"
              placeholder="Email"
            />
            <AuthField
              label={{ label: "Password", htmlFor: "password" }}
              name="password"
              type="password"
              placeholder="Password"
            />

            <div className="flex flex-row text-sm items-center">
              <label className="font-medium">
                <Field
                  type="checkbox"
                  name="remember"
                  className="relative top-[1px] mr-1"
                />
                Remember me
              </label>
              <Link href="/forgot-password">
                <a className="ml-auto text-cc font-medium">Forgot password?</a>
              </Link>
            </div>

            <FormButton text="Login" loading={loading} />
          </FormWrapper>
        </Form>
      </Formik>
      <p className="font-medium mt-6">
        Not registered yet?{" "}
        <Link href="/register">
          <a className="text-cc">Create an account</a>
        </Link>
      </p>
      <p className="absolute -bottom-20 font-medium text-xs">
        Having trouble?{" "}
        <Link href="/contact">
          <a className="text-cc">Contact the team</a>
        </Link>
      </p>
    </div>
  );
};
