import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { GET_TAGS, REGISTER } from "../lib/docs";
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
  const [slide, setSlide] = useState(7);
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

  const [register, { data: { register: { user, token } = {} } = {} }] =
    useMutation(REGISTER, {
      onCompleted: ({ register: { user, token } }) => {
        console.log(user, token);
        Cookies.set("token", token);
        handlePagination.next();
      },
      onError: (error) => {
        if (error.graphQLErrors) {
          if (error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
            return setError(error.graphQLErrors[0].message);
          }
          return setError(error.graphQLErrors[0].extensions?.errors);
        }
        return setError(error.message);
      },
    });

  const {
    data: { getTags: tags = {} } = {},
    loading: tagsLoading,
    error: tagError,
  } = useQuery(GET_TAGS);

  const handleConfirmation = async () => {
    const { interests, grade, ...rest } = data;
    const user = {
      interests: interests.map(({ id }) => ({ id })),
      grade: grade.toUpperCase(), // could throw error if grade is some how not a string
      ...rest,
    };
    await register({ variables: { data: { ...user } } });

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
