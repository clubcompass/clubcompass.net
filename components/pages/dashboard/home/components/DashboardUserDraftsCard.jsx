import React from "react";
import Link from "next/link";
import { IconLabel } from "../../../../general/IconLabel";
import { StatusTag } from "../../../../general/StatusTag";
import { FiChevronRight } from "react-icons/fi";
import { ProgressCircle } from "../../../../general/ProgressCircle";

export const DashboardUserDraftsCards = ({ club }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <StatusTag colors={{ bg: "#FFF2E4", fg: "#FF921B" }}>Draft</StatusTag>
        <span className="flex items-center gap-1 rounded-md bg-gray-100 px-2">
          <span className="h-[15px] w-[15px] -rotate-90">
            <ProgressCircle
              completed={club.completed}
              radius={5}
              total={club.total}
            />
          </span>
          {club.completed} out of {club.total}
        </span>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-lg border px-6 py-4">
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold">{club.name}</h4>
        </div>
        <InfoList>
          {club.todos.slice(0, 5).map(({ message, completed }, i) => (
            <li
              key={i}
              style={
                completed
                  ? {
                      textDecoration: "line-through",
                      color: "#E0E1E3",
                    }
                  : {}
              }>
              {message}
            </li>
          ))}
          {club.completed > 5 && (
            <span className="text-sm text-gray-300">
              +{club.completed - 5} More
            </span>
          )}
        </InfoList>
        <div className="flex">
          <Link href={`/manage/${club.slug}`}>
            <a className="mt-1 flex items-center gap-1 rounded-md bg-gray-100 px-6 py-1 text-gray-600 duration-75 hover:bg-gray-200">
              Continue editing <FiChevronRight />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const InfoList = ({ children }) => {
  return (
    <ul className="flex list-inside list-disc flex-col gap-2 overflow-scroll text-gray-400">
      {children}
    </ul>
  );
};
