import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useTransition, animated } from "react-spring";
import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../../../lib/database";
import {
  Buttons,
  Header,
  Container,
} from "../../register/onboarding/components";
import { OnboardingForm } from "../../register/onboarding/components/input/OnboardingForm";
import { Field } from "../../../general/input/control";
export const VerificationSlide = ({ prev, data, handleEmailConfirmation }) => {
  const [email, setEmail] = useState(data.email);
  const [user, setUser] = useState(true);
  const [coolingDown, setCooldown] = useState({ status: false, time: 0 });
  const [sent, setSent] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmationCodeError, setConfirmationCodeError] = useState({
    confirmation: "Confirmation code is required",
  });

  const config = {
    usePaginationAsSubmission: true,
    header: {
      title: "Find your email",
      description:
        "Enter your email address and we'll send you a confirmation code.",
    },
    control: {
      email: {
        label: "Email",
        name: "email",
        type: "text",
        span: 4,
        button: {
          label: sent
            ? coolingDown.status
              ? coolingDown.time
              : "Send again"
            : "Send",
          primary: true,
          disabled: coolingDown.status,
          type: "function",
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
        loading: loading,
        action: async () => {
          setLoading(true);
          await handleEmailConfirmation({ email });
          setLoading(false);
        },
      },
    ],
  };

  const transition = useTransition(sent, {
    from: { opacity: 0, transform: "translate(30px, 0px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(30px, 0px)" },
  });

  const sendEmail = async ({ email, setSubmitting }) => {
    setUser(true);
    const user = await db.users.get({ email });
    if (!user) {
      setUser(false);
      return setSubmitting(false);
    }
    setEmail(email);
    try {
      const response = await axios.post(
        "/api/auth/mail",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            secret_key: process.env.NEXT_PUBLIC_API_AUTHENTICATION_KEY,
          },
        }
      );
      //# Use server to confirm code
      setCode(response.data.code);
      setSent(true);
      setSubmitting(false);
      setCooldown({ status: true, time: 60 });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (coolingDown.time === 0) {
      setCooldown({ status: false, time: 0 });
    }
    if (!coolingDown.time) return;
    const intervalId = setInterval(() => {
      setCooldown((prev) => ({ ...prev, time: coolingDown.time - 1 }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [coolingDown.time]);

  useEffect(() => {
    if (confirmationCode.replace(/-/g, "") === code) {
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
  }, [code, confirmationCode]);

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

        {sent && code && (
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
                      onChange={(e) => {
                        const value = e.target.value.match(/^\d|-$/)
                          ? e.target.value
                          : "";
                        if (value.length === 0) {
                          setConfirmationCode(value);
                        } else {
                          const v = value.split("-").join("");
                          const finalVal = v.match(/.{1,3}/g).join("-");
                          setConfirmationCode(finalVal);
                        }
                      }}
                      maxLength={7}
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
      {!user && (
        <p className="text-red-500 text-sm">
          We couldn&apos;t find an account with that email. Enter a different
          email or{" "}
          <Link href="/register">
            <a className="text-cc underline">register</a>
          </Link>
          .
        </p>
      )}
      <Buttons buttons={config.buttons} />
    </Container>
  );
};
