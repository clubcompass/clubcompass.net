import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const Loading = () => {
  return (
    <div className="flex align-center justify-center">
      <AiOutlineLoading className="animate-spin text-4xl text-cc" />
    </div>
  );
};
