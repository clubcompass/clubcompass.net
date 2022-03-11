import React, { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";

export const FieldQuestion = ({ question }) => {
  const [questionHovered, setQuestionHovered] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setQuestionHovered(true)}
        onMouseLeave={() => setQuestionHovered(false)}
        className="cursor-help"
      >
        <FaRegQuestionCircle className="z-10 text-xs text-gray-500" />
      </div>
      {questionHovered && <QuestionTooltip question={question} />}
    </>
  );
};

const QuestionTooltip = ({ question }) => (
  <div className="relative">
    <BsFillTriangleFill className="absolute z-[951] -mt-[10px] h-2 w-2 -rotate-90 transform text-black " />
    <div className="absolute top-0 left-[6px] z-[950] -mt-10 w-60 rounded-[4px] bg-black px-3 py-1 shadow-lg">
      <span className="text-xs text-white">{question}</span>
    </div>
  </div>
);
