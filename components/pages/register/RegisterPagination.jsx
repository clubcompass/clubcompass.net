import React from "react";

export const RegisterPagination = ({ currentSlide, slides }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      {[...Array(slides).keys()]
        .map((i) => i + 1)
        .map((s, i) => (
          <Dot key={i} currentSlide={currentSlide} slide={s} />
        ))}
    </div>
  );
};

const Dot = ({ currentSlide, slide }) => {
  return (
    <div
      className={`w-[10px] h-[10px] rounded-full ${
        currentSlide === slide ? "bg-[#1C5EF9]" : "bg-[#E2EAFF]"
      }`}
    />
  );
};
