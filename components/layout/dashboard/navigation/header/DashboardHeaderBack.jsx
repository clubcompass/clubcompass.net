import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";

export const DashboardHeaderBack = () => {
  const router = useRouter();
  return (
    <div className="flex">
      <span
        className="flex cursor-pointer items-center gap-2 text-sm text-[#C4C8D3]"
        onClick={() => router.back()}>
        <FiChevronLeft /> Back
      </span>
    </div>
  );
};
