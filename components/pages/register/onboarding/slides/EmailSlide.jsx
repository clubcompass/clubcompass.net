import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import { Formik } from "formik";
import * as Yup from "yup";
import { Buttons, Header, Container } from "../components";
import { OnboardingForm } from "../components/input/OnboardingForm";
import { Field } from "../../../../general/input/control";
export const EmailSlide = ({ next, prev, set, data }) => {
  const [email, setEmail] = useState(data.email);
  const [sent, setSent] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmationCodeError, setConfirmationCodeError] = useState({
    confirmation: "Confirmation code is required",
  });
  const config = {
    header: {
      title: "What is your email address?",
      description:
        "Club Compass requires you to have a valid email address to prevent spamming of account creation.",
    },
    control: {
      email: {
        label: "Email",
        name: "email",
        type: "text",
        span: 4,
        button: {
          label: "Send",
          primary: true,
          disabled: false,
          type: "function",
          action: () => {
            setSent(true);
          },
        },
      },
      confirmation: {
        label: "Confirmation Code",
        id: "confirmation-code-input",
        name: "confirmation",
        type: "text",
      },
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
        disabled: disabled,
        primary: true,
        label: "Continue",
        type: "function",
        action: () => {
          set({
            email: email,
          });
          next();
        },
      },
    ],
  };

  const transition = useTransition(sent, {
    from: { opacity: 0, transform: "translate(30px, 0px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(30px, 0px)" },
  });

  const sendEmail = ({ email, setSubmitting }) => {
    setEmail(email);
    console.log("sending email to ", email);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1000);
  };

  useEffect(() => {
    const code = "123456";
    if (confirmationCode === code) {
      setConfirmationCodeError({});
      setDisabled(false);
    } else {
      if (confirmationCode.length > 0) {
        setConfirmationCodeError({ confirmation: "Invalid confirmation code" });
      } else {
        setConfirmationCodeError({
          confirmation: "Incorrect confirmation code",
        });
      }
      setDisabled(true);
    }
    return () => setDisabled(false);
  }, [confirmationCode]);

  return (
    <Container>
      <Header {...config.header} />
      <div className="w-[495px] flex flex-col gap-3">
        <Formik
          initialValues={{ email: data.email }}
          onSubmit={(values, { setSubmitting }) => {
            sendEmail({ email: values.email, setSubmitting });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
          })}
        >
          {(props) => {
            return <OnboardingForm {...props} form={config.control.email} />;
          }}
        </Formik>

        {sent && (
          <>
            {transition(
              (style, item) =>
                item && (
                  <animated.div style={style} className="w-full">
                    <Field
                      field={{
                        name: "confirmation",
                        label: "Confirmation Code",
                      }}
                      value={confirmationCode}
                      {...config.control.confirmation}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      form={{
                        touched: { confirmation: true },
                        errors: confirmationCodeError,
                      }}
                    />
                  </animated.div>
                )
            )}
          </>
        )}
      </div>
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
