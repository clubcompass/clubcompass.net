import React from "react";
import { CgSpinner } from "react-icons/cg";
export const FormButton = ({ text, loading }) => {
  return (
    <button
      disabled={loading}
      className={`${text === "Register" ? "mt-2" : "mt-6"} ${
        loading
          ? "cursor-not-allowed bg-cc"
          : "cursor-pointer bg-cc hover:bg-cc-light"
      } w-full flex-none text-white text-sm leading-6 font-semibold py-2 px-6 border border-transparent rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#dc6bf517] focus:ring-cc focus:outline-none transition-colors duration-200`}
      type="submit"
    >
      {loading ? <CgSpinner className="animate-spin w-6 h-6 mx-auto" /> : text}
    </button>
  );
};
