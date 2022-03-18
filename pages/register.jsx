import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../lib/docs";
import { db } from "../lib/database";
import {
  RegisterPagination as Pagination,
  RegisterContainer as Container,
} from "../components/pages/register";
import {
  IntroSlide,
  EmailSlide,
  StudentIdSlide,
  PasswordSlide,
  InformationSlide,
  InterestsSlide,
  SummarySlide,
  ClosingSlide,
} from "../components/pages/register/onboarding/slides";
import Cookies from "js-cookie";

const Register = () => {
  const [slide, setSlide] = useState(6);
  const [error, setError] = useState(null);
  // const [data, setData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   studentId: "",
  //   password: "",
  //   grade: "",
  //   interests: [],
  // });

  const [data, setData] = useState({
    firstname: "Paul",
    lastname: "Bokelman",
    email: "paul.bokelman1@gmail.com",
    studentId: "1850224",
    password: "Password123!",
    grade: "Senior",
    interests: [
      { id: 6, name: "engineering" },
      { id: 7, name: "math" },
      { id: 8, name: "politics" },
      { id: 9, name: "tech" },
    ],
  });

  const [register, { login: registerLoading }] = useMutation(REGISTER, {
    onCompleted: ({ register: { user, token } }) => {
      console.log(user, token);
      Cookies.set("token", token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // const {
  //   data: tags,
  //   tagsLoading,
  //   tagError,
  // } = useQuery("tags", async () => await db.tags.get());

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
    const { interests, ...rest } = data;
    const user = {
      interests: interests.map((interest) => ({ id: interest.id })),
      ...rest,
    };
    await register({ variables: { data: { ...user } } });
    handlePagination.next();

    // if (error !== null) {
    //   return setError(error);
    // } else {
    //   await login({
    //     user: { email: user.email, password: data.password, remember: true },
    //   });
    //   handlePagination.next();
    // }
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
    <StudentIdSlide
      key={3}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    <PasswordSlide
      key={4}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    <InformationSlide
      key={5}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    // <InterestsSlide
    //   key={6}
    //   tagInfo={{ tags, tagsLoading, tagError }}
    //   {...handlePagination}
    //   set={updateData}
    //   data={data}
    // />,
    <SummarySlide
      key={7}
      {...handlePagination}
      information={data}
      set={updateData}
      confirm={handleConfirmation}
      error={error}
    />,
    <ClosingSlide key={8} data={data} />,
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
