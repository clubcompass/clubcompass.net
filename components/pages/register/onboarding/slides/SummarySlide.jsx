import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { tagSchema } from "../../../../general/tags";
import { Buttons, Header, Container } from "../components";
export const SummarySlide = ({ next, prev, information }) => {
  const config = {
    header: {
      title: "Here's what we gathered.",
      description:
        "If the summary of your information looks accurate than submit and finish creating your Club Compass account.",
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
        label: "Submit",
        type: "function",
        action: next,
      },
    ],
  };
  return (
    <Container>
      <Header {...config.header} />
      <Summary information={information} />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};

const Summary = ({
  information: { firstname, lastname, email, password, grade, interests },
}) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="w-full max-w-[650px] flex items-center justify-center border-2 border-[#F4F4F4] py-5 rounded-xl">
      <div className="w-full max-w-[90%] flex flex-col gap-5">
        <div className="flex flex-row gap-4 items-center justify-start">
          <div className="flex flex-col gap-5 justify-around w-[50%]">
            <SummaryGroup title="Full name">
              <div className="overflow-x-scroll whitespace-pre break-words">
                <p className="text-lg font-bold text-black">
                  {firstname} {lastname}
                </p>
              </div>
            </SummaryGroup>
            <SummaryGroup title="Email">
              <div className="overflow-x-scroll whitespace-pre break-words">
                <p className="text-lg font-bold text-black">{email}</p>
              </div>
            </SummaryGroup>
          </div>
          <div className="flex flex-col gap-5 justify-around">
            <SummaryGroup title="Grade">
              <p className="text-lg font-bold text-black">{grade}</p>
            </SummaryGroup>

            <div className="flex flex-col">
              <div
                className="flex flex-row items-center gap-1 cursor-pointer "
                onClick={() => setShown(!shown)}
              >
                <h3 className="text-xs text-[#5D5E5E] font-semibold">
                  Password
                </h3>
                <AiFillEye className="h-3 w-3 text-black" />
              </div>
              <div
                className="flex items-center cursor-pointer w-full max-w-[14rem] overflow-x-scroll whitespace-pre break-words"
                onClick={() => setShown(!shown)}
              >
                <p className="text-lg font-bold text-black">
                  {shown ? password : password.replace(/./g, "•")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SummaryGroup title="Interests">
            <div className="grid grid-cols-4 gap-4 mt-2">
              {interests.map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
          </SummaryGroup>
        </div>
      </div>
    </div>
  );
};

const SummaryGroup = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs text-[#5D5E5E] font-semibold">{title}</h3>
      {children}
    </div>
  );
};

export const Tag = ({ tag }) => {
  const clr =
    tagSchema[tag.name] === undefined ? "#D0F0FE" : tagSchema[tag.name].bg;
  return (
    <span
      style={{ backgroundColor: clr }}
      className="flex items-center justify-center py-2 rounded-sm uppercase font-extrabold text-[0.6rem] text-[#344357]"
    >
      {tag.name}
    </span>
  );
};
