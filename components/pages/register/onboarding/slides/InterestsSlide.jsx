import React from "react";
import { Buttons, Header, Container } from "../components";
import { TagSelection } from "../../../../general/input";
export const InterestsSlide = ({ next, prev, tagInfo }) => {
  const { tags, tagsLoading, tagError } = tagInfo;
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
  };
  return (
    <Container>
      <Header {...config.header} />
      <TagSelection tags={tags} loading={tagsLoading} error={tagError} />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
