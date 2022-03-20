import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../../../../context";
import { GET_USER_LEADERSHIP_CLUBS } from "../../../../lib/docs";
import { Loading } from "../../../general/Loading";
import { Clubs } from "../../clubs";
import { useRouter } from "next/router";
export const DashboardOwnerOfClubs = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const {
    data: {
      getUserLeadershipClubs: {
        hasEditorIn,
        hasLeadershipIn,
        isPresidentOf,
      } = {},
    } = {},
    errors,
    clubsLoading,
  } = useQuery(GET_USER_LEADERSHIP_CLUBS);

  console.log(hasEditorIn, hasLeadershipIn, isPresidentOf);

  useEffect(() => {
    if (user) {
      if (!user?.active || !user?.emailVerified) {
        router.push("/dashboard");
      }
    }
  }, [router, user]);

  if (!user && loading) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      {!clubsLoading ? (
        <>
          {isPresidentOf && isPresidentOf?.length !== 0 ? (
            <ContentSection label="Owned by you" clubs={isPresidentOf} />
          ) : (
            <div>Loading Skeleton</div>
          )}
          {hasLeadershipIn && hasLeadershipIn?.length !== 0 ? (
            <ContentSection label="Leadership in" clubs={hasLeadershipIn} />
          ) : (
            <div>Loading Skeleton</div>
          )}
          {hasEditorIn && hasEditorIn?.length !== 0 ? (
            <ContentSection label="Can edit" clubs={hasEditorIn} />
          ) : (
            <div>Loading Skeleton</div>
          )}
        </>
      ) : (
        <div className="text-red-500">loading...</div>
      )}
    </div>
  );
};

const ContentSection = ({ label, clubs }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="font-light">{label}</h2>
      <Clubs clubs={clubs} manage />
    </div>
  );
};
