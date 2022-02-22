import React from "react";
import { FieldQuestion as Question } from ".";

export const FieldLabel = ({ text, question, required }) => {
  return (
    <div className="flex w-full flex-row items-baseline gap-1">
      {text && <span className="text-sm text-gray-700">{text}</span>}
      {question && <Question question={question} />}
      {required && (
        <span className="absolute -left-4 -top-0.5 text-xl text-red-500">
          *
        </span>
      )}
    </div>
  );
};
