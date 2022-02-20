import React from "react";
import Link from "next/link";
import {
  Buttons,
  Header,
  Container,
} from "../../register/onboarding/components";
export const IntroSlide = ({ next, prev }) => {
  const config = {
    header: {
      title: "Recover Club Compass account",
      description: "Don't worry, we'll help you get back into your account.",
    },
    buttons: [
      {
        primary: false,
        label: "Home",
        type: "link",
        action: "/",
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
      <p className="text-sm">
        Already know your password?{" "}
        <Link href="/login">
          <a className="text-cc">Login.</a>
        </Link>
      </p>
    </Container>
  );
};
