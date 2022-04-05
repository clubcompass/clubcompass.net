import { useState } from "react";
import { FieldProps } from "formik";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
interface Props extends FieldProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  span?: number;
}

export const DashboardField = ({
  label,
  type,
  required,
  placeholder,
  textarea,
  span,
  field,
  form,
  ...props
}: Props) => {
  return (
    <div className="w-full" style={{ gridColumn: `span ${span}` }}>
      <label className="relative block">
        {label && <Label label={label} required={required} />}
        {textarea ? (
          <textarea
            className={`${
              label && "mt-1"
            } form-input block h-24 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-cc focus:ring focus:ring-cc-light focus:ring-opacity-50`}
            placeholder={placeholder || ""}
            {...field}
          />
        ) : (
          <input
            type={type || "text"}
            className={`${
              label && "mt-1"
            } form-input block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-cc focus:ring focus:ring-cc-light focus:ring-opacity-50`}
            placeholder={placeholder || ""}
            {...field}
          />
        )}
      </label>
      {form.errors[field.name] && form.touched[field.name] ? (
        <div className="mt-1 text-xs text-red-500">
          {form.errors[field.name]}
        </div>
      ) : null}
    </div>
  );
};

const Label = ({
  label,
  required,
  question,
}: {
  label: string;
  required: boolean;
  question?: string;
}) => {
  return (
    <div className="flex w-full flex-row items-baseline gap-1">
      {label && <span className="text-sm">{label}</span>}
      {question && <Question question={question} />}
      {required && (
        <span className="absolute -left-3.5 -top-0.5 text-xl text-red-500">
          *
        </span>
      )}
    </div>
  );
};

const Question = ({ question }: { question: string }) => {
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

const QuestionTooltip = ({ question }: { question: string }) => (
  <div className="relative">
    <BsFillTriangleFill className="absolute z-50 -mt-[10px] h-2 w-2 -rotate-90 transform text-black " />
    <div className="absolute top-0 left-[6px] z-50 -mt-10 w-60 rounded-[4px] bg-black px-3 py-1 shadow-lg">
      <span className="text-xs text-white">{question}</span>
    </div>
  </div>
);
