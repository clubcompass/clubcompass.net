import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../../context";
import { db } from "../../../../lib/database";
// import { Clubs } from "../../clubs"; //! use club component?
import { Loading } from "../../../general/Loading";
export const DashboardUserClubs = () => {
  const { user } = useAuthContext();

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      <p>
        Your ccId: <span className="font-bold">{user.ccid}</span>
      </p>
      <h2 className="text-lg font-semibold">Your Clubs</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* <Clubs clubs={user.clubs} /> */}
        {user.clubs.map((club) => (
          <ClubCard key={club.id} {...club} />
        ))}
      </div>
    </div>
  );
};

const ClubCard = ({ name, slug, tags }) => {
  return (
    <Link href={`/club/${slug}`}>
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
