import React from "react";
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
        label: "Back",
        type: "function",
        action: prev,
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
    </Container>
  );
};
