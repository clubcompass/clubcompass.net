import React from "react";
import { MdGroupAdd } from "react-icons/md";

type Props = {
  onClick: () => void;
};

export const DashboardAddMemberButton = ({ ...props }: Props) => (
  <button
    className="flex flex-row items-center gap-2 rounded-lg border border-[#E4E4E4] bg-white px-5 py-2.5 text-[#727272] shadow-md shadow-black/[0.04] transition duration-200 hover:border-[#b3b3b3] hover:text-black"
    type="button"
    {...props}
  >
    <MdGroupAdd size={22} />
    <span className="font-medium">Invite new member</span>
  </button>
);
