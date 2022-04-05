import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../context";
import { GET_TAGS } from "../lib/docs";
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

const Register = () => {
  const { user, register } = useAuthContext();
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState(null);
  // const [data, setData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   studentId: "",
  //   password: "",
  //   grade: "Freshman",
  //   interests: [],
  // });

  const [data, setData] = useState({
    firstname: "Paul",
    lastname: "Bokelman",
    email: "paul.bokelman2@gmail.com",
    studentId: "1850225",
    password: "Password123!",
    grade: "Senior",
    interests: [
      { id: "cl0vxq2hl0000ropcsj6aa77y", name: "volunteering" },
      { id: "cl0vxq2hl0001ropcnyiskhh6", name: "charity" },
      { id: "cl0vxq2hl0002ropc91kqevai", name: "science" },
      { id: "cl0vxq2hl0003ropc393fpmg5", name: "tech" },
    ],
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

  const {
    data: { getTags: tags = {} } = {},
    loading: tagsLoading,
    error: tagError,
  } = useQuery(GET_TAGS, {
    onComplete: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleConfirmation = async () => {
    const { interests, grade, ...rest } = data;
    const user = {
      interests: interests.map(({ id }) => ({ id })),
      grade: grade.toUpperCase(), // could throw error if grade is some how not a string
      ...rest,
    };
    try {
      const { errors } = await register({ user }); // move to auth provider
      if (errors) {
        return console.log(errors);
      }
      handlePagination.next();
    } catch (e) {
      setError(e);
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
    <InterestsSlide
      key={6}
      tagInfo={{ tags, tagsLoading, tagError }}
      {...handlePagination}
      set={updateData}
      data={data}
    />,
    <SummarySlide
      key={7}
      {...handlePagination}
      information={data}
      set={updateData}
      confirm={handleConfirmation}
      error={error}
    />,
    <ClosingSlide
      key={8}
      firstname={user?.firstname || data.firstname}
      email={user?.email || data.email}
    />,
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
