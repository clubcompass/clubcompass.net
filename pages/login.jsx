import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context";
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
  const handleSubmission = async ({
    email,
    password,
    remember,
    setSubmitting,
  }) => {
    setSubmitting(true);
    const { user, error } = await login({
      user: { email, password, remember },
    });
    if (error) {
      setSubmitting(false);
      console.log(error);
      setSSE(error);
    } else {
      setSubmitting(false);
      router.push("/dashboard");
    }
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
