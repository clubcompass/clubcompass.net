import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
// import { db } from "../../../../lib/database";
// import { Clubs } from "../../clubs"; //! use club component?
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
        <h2 className="text-lg font-semibold">Drafts</h2>
        <div className="grid grid-cols-3 gap-4">
          {drafts.map((club) => (
            <DraftCard key={club.id} {...club} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DraftCard = ({ name, slug, tags }) => {
  return (
    <Link href={`/dashboard/manage/club/${slug}`}>
      <a>
        <div className="flex h-[225px] flex-col items-start justify-between rounded-xl border-2 border-[#E6E6E6] px-8 py-4 transition duration-200 hover:border-blue-500">
          <div>
            <h2 className="mb-4 text-2xl font-bold">{name}</h2>
            <ul>
              {tags.map(({ id, name }) => (
                <li key={id} className="text-base">
                  - {name}
                </li>
              ))}
            </ul>
          </div>
          <p className="font-medium italic text-cc">{slug}</p>
        </div>
      </a>
    </Link>
  );
};
