import React from "react";
import { Buttons, Header, Container } from "../components";
export const ClosingSlide = () => {
  const config = {
    header: {
      title: "Thanks Paul, thats all we needed!",
      description:
        "With a Club Compass account you can explore and find clubs of interest or create your own!",
    },
    buttons: [
      {
        disabled: false,
        primary: false,
        label: "Dashboard",
        type: "link",
        action: "/dashboard",
      },
      {
        disabled: false,
        primary: true,
        label: "Explore",
        type: "link",
        action: "/clubs",
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
