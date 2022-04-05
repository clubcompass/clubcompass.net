import React from "react";
import { BiLink } from "react-icons/bi";
import { useModalContext } from "../../../../../general/Modal";

export const LinkAddButton = () => {
  const { openModal } = useModalContext();
  return (
    <button
      onClick={openModal}
      className="flex w-fit flex-row items-center gap-2 rounded-lg border border-[#E4E4E4] bg-white px-5 py-2.5 text-[#727272] shadow-md shadow-black/[0.04] transition duration-200 hover:border-[#b3b3b3] hover:text-black"
      type="button">
      <BiLink size={19} />
      Add Link
    </button>
  );
};
