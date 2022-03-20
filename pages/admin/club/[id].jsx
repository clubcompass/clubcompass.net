import React from "react";
import { useRouter } from "next/router";
import { Club as ClubComponent } from "../../../components/pages/club";
import Link from "next/link";
import { GET_CLUB } from "../../../lib/docs";
import { useQuery } from "@apollo/client";
import { AdminClubsApproveModal } from "../../../components/pages/dashboard/admin";

const Club = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { getClub: club = {} } = {},
    loading,
    error,
  } = useQuery(GET_CLUB, {
    variables: {
      id,
    },
  });

  if (!club || loading) return <p>loading...</p>;

  return (
    <div className="flex flex-col gap-2 p-6">
      <div>
        <Link href="/admin">
          <a className="text-lg text-cc">&larr; Back</a>
        </Link>
      </div>
      {club && (
        <>
          <div className="flex items-center justify-between gap-4 border-b-2 pb-2">
            <div>
              <h4 className="text-3xl font-bold">Club Draft</h4>
              <p className="text-ccGreyLight">
                This is only an example of what the club page will look like
                after it's been approved.
              </p>
            </div>
            <div className="flex gap-2">
              <AdminClubsApproveModal
                reject
                name={club.name}
                clubId={club.id}
                email={club.email}
              />
              <AdminClubsApproveModal name={club.name} clubId={club.id} />
            </div>
          </div>
          <ClubComponent>
            <ClubComponent.Wrapper
              availability={club.availability}
              name={club.name}
              clubId={club.id}
              slug={club?.slug}
              draft>
              <ClubComponent.Header name={club.name} tags={club.tags} />
              <ClubComponent.Contact email={club.email} links={club.links} />
              <ClubComponent.Meeting
                time={club.meetingDate}
                location={club.location}
                availability={club.availability}
              />
              <ClubComponent.Content description={club.description} />
              <ClubComponent.Members members={club.members} />
            </ClubComponent.Wrapper>
          </ClubComponent>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default Club;
