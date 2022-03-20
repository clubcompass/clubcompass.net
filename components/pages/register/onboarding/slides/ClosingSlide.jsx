import React from "react";
import { Buttons, Header, Container } from "../components";
export const ClosingSlide = ({ firstname, email }) => {
  const config = {
    header: {
      title: `Thanks ${firstname}, thats all we needed!`,
      description: `You have successfully created your account! We sent an email to ${email} with a link to verify your account.`,
      // description:
      //   "With a Club Compass account you can explore and find clubs of interest or create your own!",
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
