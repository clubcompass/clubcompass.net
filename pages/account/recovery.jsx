import React, { useState } from "react";
import { useAuthContext } from "../../context";
import { updatePassword } from "../../lib/auth";
import { db } from "../../lib/database";
import {
  RegisterPagination as Pagination,
  RegisterContainer as Container,
} from "../../components/pages/register";
import {
  IntroSlide,
  VerificationSlide,
  ResetSlide,
  CompleteSlide,
} from "../../components/pages/account/recovery";

const Register = () => {
  const { login } = useAuthContext();
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handlePagination = {
    next: () => {
      setSlide(slide + 1);
    },
    prev: () => {
      setSlide(slide - 1);
    },
    direct: ({ slide }) => {
      setSlide(slide);
    },
  };

  const updateData = (values) => {
    setData({
      ...data,
      ...values,
    });
  };

  const handleEmailConfirmation = async ({ email }) => {
    updateData({ email });
    try {
      const user = await db.users.get({ email });
      if (user) {
        setUser(user);
        handlePagination.next();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordReset = async ({ password }) => {
    setError(null);
    updateData({ password });
    try {
      const { error } = await updatePassword({
        user_id: user.id,
        password,
      });

      if (error !== null) {
        setError(error);
      } else {
        const { email } = data;
        const remember = true;
        const { user, error } = await login({
          user: { email, password, remember },
        });
        if (error) {
          console.log(error);
        }
        handlePagination.next();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const slides = [
    <IntroSlide key={1} {...handlePagination} />,
    <VerificationSlide
      key={2}
      {...handlePagination}
      handleEmailConfirmation={handleEmailConfirmation}
      data={data}
    />,
    <ResetSlide
      key={3}
      {...handlePagination}
      data={data}
      handlePasswordReset={handlePasswordReset}
      error={error}
    />,
    <CompleteSlide key={4} firstname={user?.firstname} />,
  ];

  return (
    <Container>
      <Pagination slides={slides.length} currentSlide={slide} />
      {slides[slide - 1]}
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

export default Register;
