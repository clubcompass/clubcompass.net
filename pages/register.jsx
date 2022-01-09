import React, { useState } from "react";
import { useQuery } from "react-query";
import { db } from "../lib/database";
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
  const [slide, setSlide] = useState(6);

  const {
    data: tags,
    tagsLoading,
    tagError,
  } = useQuery("tags", async () => await db.get.tags());

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
    <PasswordSlide key={3} {...handlePagination} />,
    <InformationSlide key={4} {...handlePagination} />,
    <InterestsSlide
      key={5}
      tagInfo={{ tags, tagsLoading, tagError }}
      {...handlePagination}
    />,
    <SummarySlide
      key={6}
      {...handlePagination}
      information={{
        firstname: "Paul",
        lastname: "Bokelman",
        email: "myemail@gmail.com",
        password: "password",
        grade: "Senior",
        interests: [
          { name: "volunteering", id: "ckxteyszp00009fq3knmqn20j" },
          { name: "charity", id: "ckxteyszp00019fq38fwsvphm" },
          { name: "science", id: "ckxteyszp00029fq3qqa3dq3l" },
          { name: "tech", id: "ckxteyszp00039fq387ogl6de" },
        ],
      }}
    />,
    <ClosingSlide key={7} />,
  ];

  return (
    <Container>
      <Pagination
        slides={slides.length}
        currentSlide={slide}
        direct={handlePagination.direct}
      />
      {slides[slide - 1]}
    </Container>
  );
};

export default Register;
