import React from "react";
import { useRouter } from "next/router";
import { Club as ClubComponent } from "../../../components/pages/club";
import Link from "next/link";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { AdminClubsApproveModal } from "../../../components/pages/dashboard/admin";

const Club = () => {
  const router = useRouter();
  const { id } = router.query;

  const club = {
    id: "cl0vvnc1701263pxmg4j7tc1w",
    name: "Ace Club",
    description:
      "To empower others to create a change and advocate for mental health awareness",
    availability: "OPEN",
    meetingDate: "Every other week",
    location: "G104",
    email: "emmashines@yahoo.com",
    links: [
      {
        name: "Instagram",
        link: "https://www.instagram.com",
        type: "INSTAGRAM",
      },
      {
        name: "Discord",
        link: "https://www.discord.com",
        type: "DISCORD",
      },
    ],
    _count: {
      members: 4,
    },
    members: [
      {
        firstname: "Hays",
        lastname: "Hebert",
        roles: [
          {
            name: "vice president",
            type: "LEADER",
            color: "#FFEAB4",
          },
        ],
      },
      {
        firstname: "Mason",
        lastname: "Mathews",
        roles: [
          {
            name: "treasurer",
            type: "LEADER",
            color: "#F3DCFE",
          },
        ],
      },
      {
        firstname: "Helga",
        lastname: "Adams",
        roles: [
          {
            name: "president",
            type: "LEADER",
            color: "#C3F4E9",
          },
        ],
      },
      {
        firstname: "Andrea",
        lastname: "Noble",
        roles: [
          {
            name: "secretary",
            type: "LEADER",
            color: "#FFDCE5",
          },
        ],
      },
    ],
    tags: [
      {
        name: "writing",
      },
      {
        name: "academic competition",
      },
      {
        name: "education",
      },
      {
        name: "public speaking",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 p-6">
      <div>
        <Link href="/admin">
          <a className="text-lg text-cc">&larr; Back</a>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 border-b-2 pb-2">
        <div>
          <h4 className="text-3xl font-bold">Club Draft</h4>
          <p className="text-ccGreyLight">
            This is only an example of what the club page will look like after
            it's been approved.
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
      {club && (
        <ClubComponent>
          <ClubComponent.Wrapper
            availability={club.availability}
            name={club.name}
            clubId={club.id}
            slug={club.slug}
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
