import React from "react";
import { Buttons, Header, Container } from "../components";
import { FormControl } from "../../../../general/input/control";
export const PasswordSlide = ({ next, prev }) => {
  const config = {
    header: {
      title: "What's your password? (We won't look)",
      description:
        "You will need this password to log into your Club Compass account so make sure its something you'll remember.",
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
      <FormControl config={config.control} />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
