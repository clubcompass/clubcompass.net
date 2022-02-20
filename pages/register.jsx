import React, { useState } from "react";
import { useQuery } from "react-query";
import { db } from "../lib/database";
import { useAuthContext } from "../context";
import {
  RegisterPagination as Pagination,
  RegisterContainer as Container,
} from "../components/pages/register";
import {
  IntroSlide,
  EmailSlide,
  PasswordSlide,
  InformationSlide,
  InterestsSlide,
  SummarySlide,
  ClosingSlide,
} from "../components/pages/register/onboarding/slides";

const Register = () => {
  const { register, login } = useAuthContext();
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    grade: "",
    interests: [],
  });

  const {
    data: tags,
    tagsLoading,
    tagError,
  } = useQuery("tags", async () => await db.tags.get());

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

  const handleConfirmation = async () => {
    const { user, error } = await register({ data });
    if (error !== null) {
      return setError(error);
    } else {
      await login({
        user: { email: user.email, password: data.password, remember: true },
      });
      handlePagination.next();
    }
  };

  const updateData = (values) => {
    setData({
      ...data,
      ...values,
    });
  };

  const slides = [
    <IntroSlide key={1} {...handlePagination} />,
    <EmailSlide key={2} {...handlePagination} set={updateData} data={data} />,
    <PasswordSlide
      key={3}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    <InformationSlide
      key={4}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    <InterestsSlide
      key={5}
      tagInfo={{ tags, tagsLoading, tagError }}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    <SummarySlide
      key={6}
      {...handlePagination}
      information={data}
      set={updateData}
      confirm={handleConfirmation}
      error={error}
    />,
    <ClosingSlide key={7} data={data} />,
  ];

  return (
    <Container>
      <Pagination slides={slides.length} currentSlide={slide} />
      {slides[slide - 1]}
    </Container>
  );
};

export default Register;
