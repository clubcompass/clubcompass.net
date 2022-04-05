import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context";
// import { login as LOGIN } from "../server/tests/unit/auth/authUnitDocuments";
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
  <div className="flex w-full flex-row">
    <div className="flex h-screen w-full items-center justify-center">
      {children[0]}
    </div>
    <div className="hidden h-screen w-full md:block">{children[1]}</div>
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
    const { errors } = await login({ user: { email, password, remember } });
    console.log(errors);
    if (errors) {
      const { graphQLErrors = null, networkError = null } = errors;
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          console.log(error);
        });
      }
      if (networkError) {
        console.log(networkError);
      }
    }
    console.log(JSON.stringify(errors));
    // if (error) {
    //   setSubmitting(false);
    //   console.log(error);
    //   setSSE(error);
    // } else {
    setSubmitting(false);
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
