import React from "react";
import { Buttons, Header, Container } from "../components";
import { FormControl } from "../../../../general/input/control";
import { OptionSelection } from "../../../../general/input";
export const InformationSlide = ({ next, prev }) => {
  const config = {
    header: {
      title: "Who are you?",
      description:
        "To help identify users, Club Compass uses first and last names and not customized usernames.",
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
          layout: "1/2",
          justForm: true,
          split: true,
        },
        form: {
          label: "First name",
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
          layout: "1/2",
          justForm: true,
          split: true,
        },
        form: {
          label: "Last name",
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
      <OptionSelection
        options={["freshman", "sophomore", "junior", "senior"]}
      />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
