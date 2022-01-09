import React from "react";
import { Buttons, Header, Container } from "../components";
import { FormControl } from "../../../../general/input/control";
import { TagSelection } from "../../../../general/input";
export const InterestsSlide = ({ next, prev }) => {
  const config = {
    header: {
      title: "What subject(s) interests you?",
      description:
        "Club Compass uses your interests in order to filter and find clubs that fit your interests.",
    },
    buttons: [
      {
        disabled: false,
        primary: false,
        label: "Back",
        type: "function",
        action: prev,
      },
      {
        disabled: false,
        primary: true,
        label: "Continue",
        type: "function",
        action: next,
      },
    ],
    control: [
      {
        general: {
          visible: true,
          layout: "full",
          justForm: true,
        },
        form: {
          label: "password",
          type: "password",
        },
        button: {
          primary: true,
          label: "Send", // || send
          disabled: true,
        },
      },
      {
        general: {
          visible: true,
          layout: "full",
          justForm: true,
        },
        form: {
          label: "confirm password",
          type: "password",
        },
        button: {
          primary: true,
          label: "Verify",
          disabled: false, // || disabled
        },
      },
    ],
  };
  return (
    <Container>
      <Header {...config.header} />
      <TagSelection />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
