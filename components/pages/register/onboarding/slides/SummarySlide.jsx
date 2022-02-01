import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { tagSchema } from "../../../../general/tags";
import { Buttons, Header, Container } from "../components";
export const SummarySlide = ({ direct, prev, information, confirm, error }) => {
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
        action: confirm,
      },
    ],
  };
  return (
    <Container>
      <Header {...config.header} />
      {error && (
        <p className="text-red-500 leading-tight text-sm">{error.error}</p>
      )}
      <Summary information={information} direct={direct} />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};

const Summary = ({
  information: { firstname, lastname, email, password, grade, interests },
  direct,
}) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="w-full max-w-[650px] flex items-center justify-center border-2 border-[#F4F4F4] py-5 rounded-xl">
      <div className="w-full max-w-[90%] flex flex-col gap-5">
        <div className="flex flex-row gap-4 items-center justify-start">
          <div className="flex flex-col gap-5 justify-around w-[50%]">
            <SummaryGroup title="Full name" direct={() => direct({ slide: 4 })}>
              <div className="overflow-x-scroll whitespace-pre break-words">
                <p className="text-lg font-bold text-black">
                  {firstname} {lastname}
                </p>
              </div>
            </SummaryGroup>
            <SummaryGroup title="Email" direct={() => direct({ slide: 2 })}>
              <div className="overflow-x-scroll whitespace-pre break-words">
                <p className="text-lg font-bold text-black">{email}</p>
              </div>
            </SummaryGroup>
          </div>
          <div className="flex flex-col gap-5 justify-around">
            <SummaryGroup title="Grade" direct={() => direct({ slide: 4 })}>
              <p className="text-lg font-bold text-black">{grade}</p>
            </SummaryGroup>

            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <h3 className="text-xs text-[#5D5E5E] font-semibold">
                  Password
                </h3>
                <button
                  onClick={() => direct({ slide: 3 })}
                  className="ml-1 px-1 uppercase text-[8px] font-bold bg-[#1C5EF9]/10 text-[#1C5EF9] rounded-sm"
                >
                  Edit
                </button>
                <div
                  className="ml-1 px-1 cursor-pointer transition duration-200 ease-in-out transform text-xs bg-[#1C5EF9]/10 text-[#1C5EF9] rounded-sm"
                  onClick={() => setShown(!shown)}
                >
                  {shown ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
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
          <SummaryGroup title="Interests" direct={() => direct({ slide: 5 })}>
            {interests.length !== 0 ? (
              <div className="grid grid-cols-4 gap-4 mt-2">
                {interests.map((tag) => (
                  <Tag key={tag.id} tag={tag} />
                ))}
              </div>
            ) : (
              <p className="text-xs mt-2">No interests selected.</p>
            )}
          </SummaryGroup>
        </div>
      </div>
    </div>
  );
};

const SummaryGroup = ({ title, children, direct }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <h3 className="text-xs text-[#5D5E5E] font-semibold">{title}</h3>
        <button
          onClick={direct}
          className="ml-1 px-1 uppercase text-[8px] font-bold bg-[#1C5EF9]/10 text-[#1C5EF9] rounded-sm"
        >
          Edit
        </button>
      </div>
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
