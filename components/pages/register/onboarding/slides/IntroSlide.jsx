import React from "react";
import Link from "next/link";
import { Buttons, Header, Container } from "../components";
export const IntroSlide = ({ next, prev }) => {
  const config = {
    header: {
      title: "We just have a few quick questions for you.",
      description:
        "Club Compass just needs to know a little bit about you before you can join or create clubs.",
    },
    buttons: [
      {
        primary: false,
        label: "Home",
        type: "link",
        action: "/",
      },
      {
        primary: true,
        label: "Get started",
        type: "function",
        action: next,
      },
    ],
  };
  return (
    <Container>
      <Header {...config.header} />
      <Buttons buttons={config.buttons} />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login">
          <a className="text-cc">Login.</a>
        </Link>
      </p>
    </Container>
  );
};
