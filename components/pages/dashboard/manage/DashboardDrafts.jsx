import { useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
// import { db } from "../../../../lib/database";
import { Loading } from "../../../general/Loading";
import { useRouter } from "next/router";
export const DashboardDrafts = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  // const drafts = user.roles.reduce(
  //   (acc, role) =>
  //     role.name === "president" &&
  //     user.clubs.find(
  //       (club) => club.id === role.clubId && club.status === "DRAFT"
  //     )
  //       ? acc.concat(user.clubs.find((club) => club.id === role.clubId))
  //       : acc,
  //   []
  // );

  const drafts = [];

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-2 flex flex-col gap-2">
        <h2 className="tracking wide font-light">Drafts</h2>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-cards">
          {drafts.map((club) => (
            <DraftCard key={club.id} {...club} />
          ))}
          <div className="mx-auto flex items-center md:mx-0">
            <Link href="/dashboard/manage/club/new">
              <a className="flex items-center rounded-lg bg-cc py-1 px-6 text-white">
                Create club
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const DraftCard = ({ name, slug, tags }) => {
  const partsCompleted = 3;
  const completed = partsCompleted === 14;
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border-[1px] bg-white py-3 px-6">
      <h4 className="text-xl font-bold leading-tight">{name}</h4>
      <div className="flex gap-2">
        <span
          className={`${
            completed ? "bg-[#26d46f50]" : "bg-[#ffc42150]"
          } flex flex-row items-center rounded-md px-3 text-sm text-black`}
        >
          {partsCompleted}/14
        </span>
        <button className="rounded-md bg-cc px-8 py-1 text-white">Edit</button>
      </div>
    </div>
  );
};
