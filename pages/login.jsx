import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useAuthContext } from "../context";
import { login as LOGIN } from "../server/tests/unit/auth/authUnitDocuments";
import {
  Container,
  Content,
  Graphic,
  LoginForm,
} from "../components/pages/login";

const Login = () => {
  return (
    <LoginContainer>
      <LoginContent />
      <Graphic />
    </LoginContainer>
  );
};

const LoginContainer = ({ children }) => (
  <div className="flex flex-row w-full">
    <div className="flex w-full h-screen items-center justify-center">
      {children[0]}
    </div>
    <div className="hidden md:block h-screen w-full">{children[1]}</div>
  </div>
);

const LoginContent = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const [sse, setSSE] = useState(null);

  // email: "paul.bokelman1@gmail.com",
  // password: "Password123!",
  const handleSubmission = async ({
    email,
    password,
    remember,
    setSubmitting,
  }) => {
    setSubmitting(true);
    await login({ email, password, remember });
    // if (error) {
    //   setSubmitting(false);
    //   console.log(error);
    //   setSSE(error);
    // } else {
    setSubmitting(false);
    console.log("pushes to dashboard");
    // router.push("/dashboard");
    // }
  };

  return (
    <Container>
      <Content>
        <LoginForm handleSubmission={handleSubmission} serverSideError={sse} />
      </Content>
    </Container>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      navigationLayout: false,
    },
  };
};

export default Login;
