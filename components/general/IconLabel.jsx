import React from "react";
import { BsPersonFill, BsPiggyBankFill } from "react-icons/bs";
import { FaChessQueen, FaCrown } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { IoMdPin } from "react-icons/io";

export const IconLabel = ({ children, icon }) => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-2 text-black">
      {icon && <Icon icon={icon} />}
      {children}
    </div>
  );
};

const Icon = ({ icon }) => {
  return (
    <>
      {icon === "member" && <BsPersonFill />}
      {icon === "president" && <FaCrown size={14} />}
      {icon === "vice president" && <FaChessQueen size={14} />}
      {icon === "treasurer" && <BsPiggyBankFill />}
      {icon === "secretary" && <HiPencilAlt />}
      {icon === "location" && <IoMdPin size={14} />}
    </>
  );
};
