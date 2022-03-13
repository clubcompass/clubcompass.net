import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
// import { db } from "../../../../lib/database";
import { Loading } from "../../../general/Loading";
export const DashboardDrafts = () => {
  const { user } = useAuthContext();

  if (!user) return <Loading />;

  const drafts = user.roles.reduce(
    (acc, role) =>
      role.name === "president" &&
      user.clubs.find(
        (club) => club.id === role.clubId && club.status === "DRAFT"
      )
        ? acc.concat(user.clubs.find((club) => club.id === role.clubId))
        : acc,
    []
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 mt-2">
        <h2 className="font-light tracking wide">Drafts</h2>
        <div className="grid grid-cols-cards gap-4">
          {drafts.map((club) => (
            <DraftCard key={club.id} {...club} />
          ))}
          <Link href="/dashboard/manage/club/new">
            <a>
              <div className="h-[58px] w-full flex flex-col justify-center items-center text-cc text-lg border-[3px] border-dashed border-cc p-6 rounded-xl transition duration-300 ease-in-out">
                Create club +
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const DraftCard = ({ name, slug, tags }) => {
  const partsCompleted = 3;
  const completed = partsCompleted === 14;
  return (
    <div className="flex flex-row justify-between items-center bg-white border-[1px] rounded-lg py-3 px-6">
      <h4 className="font-bold text-xl leading-tight">{name}</h4>
      <div className="flex gap-2">
        <span
          className={`${
            completed ? "bg-[#26d46f50]" : "bg-[#ffc42150]"
          } flex flex-row items-center px-3 rounded-md text-black text-sm`}
        >
          {partsCompleted}/14
        </span>
        <button className="bg-cc text-white px-8 py-1 rounded-md">Edit</button>
      </div>
    </div>
  );
};
