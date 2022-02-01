import React, { useState } from "react";
import { Buttons, Header, Container } from "../components";
import { TagSelection } from "../../../../general/input";
export const InterestsSlide = ({ next, prev, tagInfo, set, data }) => {
  const [selectedTags, setSelectedTags] = useState(data.interests);
  const { tags, tagsLoading, tagError } = tagInfo;
  const config = {
    header: {
      title: "What subject(s) interests you?",
      description:
        "You can choose up to 4 interests to help Club Compass filter and find clubs just for you.",
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
        action: () => {
          set({ interests: selectedTags });
          next();
        },
      },
    ],
  };

  return (
    <Container>
      <Header {...config.header} />
      <TagSelection
        tags={tags}
        loading={tagsLoading}
        error={tagError}
        initial={selectedTags}
        set={(selected) => setSelectedTags(selected)}
        limit={4}
      />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
