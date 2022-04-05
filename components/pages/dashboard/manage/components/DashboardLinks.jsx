import React from "react";
import Link from "next/link";
import { DashboardLinkType } from "./DashboardLinkType";
import { FiChevronRight } from "react-icons/fi";

export const DashboardLinks = ({ links, canDelete }) => {
  return (
    <div className="flex flex-col justify-items-center gap-6 md:grid md:grid-cols-dashboardCards">
      {links.map((link, i) => (
        <div
          key={i}
          className="flex w-full flex-col gap-2 rounded-lg border px-4 py-4">
          <h5 className="text-xl font-semibold">{link.name}</h5>
          <p className="text-gray-400">{link.link}</p>
          <div className="mt-1 flex justify-between">
            <Link href={link.link}>
              <a target="_blank">
                <DashboardLinkType type={link.type} />
              </a>
            </Link>
            {canDelete ? (
              <button
                onClick={() => handleDelete({ id: link.id })}
                className="rounded-md bg-gray-100 px-6 py-1 text-gray-600 duration-100 hover:bg-gray-200">
                Delete
              </button>
            ) : (
              <Link href={link.link}>
                <a className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-1 text-gray-600 duration-100 hover:bg-gray-200 ">
                  View Link
                  <FiChevronRight />
                </a>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
