import React, { useEffect, useState } from "react";
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
  const [slide, setSlide] = useState(1);
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
  } = useQuery("tags", async () => await db.get.tags());

  const handleConfirmation = async () => {
    console.log("Confirming...");
    console.log("user data: ", data);
  };

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
    />,
    <ClosingSlide key={7} data={data} />,
  ];

  useEffect(() => {
    console.log("DATA UPDATED", data);
  }, [data]);

  return (
    <Container>
      <Pagination slides={slides.length} currentSlide={slide} />
      {slides[slide - 1]}
    </Container>
  );
};

export default Register;
