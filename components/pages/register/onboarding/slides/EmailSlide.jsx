import React from "react";
import { Buttons, Header, Container } from "../components";
import { FormControl } from "../../../../general/input/control";
export const EmailSlide = ({ next, prev }) => {
  const config = {
    header: {
      title: "What is your email address?",
      description:
        "Club Compass requires you to have a valid email address to prevent spamming of account creation.",
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
          layout: "3/4",
        },
        form: {
          label: "email",
          type: "text",
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
          layout: "3/4",
          justForm: false,
        },
        form: {
          label: "confirmation code",
          type: "text",
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
      <FormControl config={config.control} />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
