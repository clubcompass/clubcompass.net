import React, { useState } from "react";
import {
  RegisterPagination as Pagination,
  RegisterContainer as Container,
} from "../components/pages/register";
import {
  IntroSlide,
  EmailSlide,
} from "../components/pages/register/onboarding/slides";
const Register = () => {
  const [slide, setSlide] = useState(2);
  console.log(slide);
  const maxSlides = 6;

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

  const slides = [
    <IntroSlide key={1} {...handlePagination} />,
    <EmailSlide key={2} {...handlePagination} />,
    <IntroSlide key={3} {...handlePagination} />,
    <IntroSlide key={4} {...handlePagination} />,
    <IntroSlide key={5} {...handlePagination} />,
  ];

  return (
    <Container>
      <Pagination
        slides={6}
        currentSlide={slide}
        direct={handlePagination.direct}
      />
      {slides[slide - 1]}
    </Container>
  );
};

export default Register;
