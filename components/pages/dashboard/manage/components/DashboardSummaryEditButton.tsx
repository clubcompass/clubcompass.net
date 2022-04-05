import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { usePaginationContext } from "./DashboardPaginationProvider";

export const DashboardSummaryEditButton = ({ value }: { value: number }) => {
  const { direct } = usePaginationContext();
  return (
    <button
      onClick={() => direct(value)}
      className="flex w-fit flex-row items-center gap-2 rounded-lg border border-[#E4E4E4] bg-white py-1 px-4 text-sm text-[#727272] shadow-md shadow-black/[0.04] transition duration-200 hover:border-[#b3b3b3] hover:text-black">
      <FiEdit2 size={12} />
      Edit
    </button>
  );
};
