import React from "react";
import {
  Buttons,
  Header,
  Container,
} from "../../register/onboarding/components";
export const CompleteSlide = ({ firstname, handleCompletion }) => {
  const config = {
    header: {
      title: "Password reset successful",
      description: `Great job ${firstname} you have successfully reset your password, you can now access your dashboard or explore clubs.`,
    },
    buttons: [
      {
        disabled: false,
        primary: false,
        label: "Explore",
        type: "link",
        action: "/clubs",
      },
      {
        disabled: false,
        primary: true,
        label: "Dashboard",
        type: "link",
        action: "/dashboard",
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
