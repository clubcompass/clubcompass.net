import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { db } from "../../lib/database";
import { Club as ClubComponent } from "../../components/pages/club";

// import { MdLocationOn } from "react-icons/md";
// import { BsClock, BsFillPersonFill } from "react-icons/bs";
// import { IoMdMail } from "react-icons/io";
// import { BsClockFill } from "react-icons/bs";
// import { FiExternalLink } from "react-icons/fi";

const Club = () => {
  const router = useRouter();
  const [slugLoaded, setSlugLoaded] = useState(false);
  const { slug } = router.query;

  // const {
  //   data: club,
  //   error: clubError,
  //   isLoading: clubLoading,
  // } = useQuery("club", async () => await db.get.club.by.slug({ slug: slug }), {
  //   enabled: slugLoaded,
  // });

  // console.log("name", slugLoaded);
  // console.log("clubs", clubLoading);

  // useEffect(() => {
  //   slug === undefined ? setSlugLoaded(false) : setSlugLoaded(true);
  // }, [slug]);

  // if (clubLoading === true) return "Loading...";

  // if (clubError) return "An error has occurred: " + clubError.message;

  // console.log(club);

  const club = {
    id: "ckzui2z4g0086znq3rxkjr5zc",
    name: "Photography Club",
    slug: "photography-club",
    description:
      "Photography club is a place for students who are passionate about photography to explore their interests outside of the classroom. All students of any skill level are welcome. No need for any prior experience. Come join our club to take, edit, and display your photography!",
    email: "abhinav.palacharla@gmail.com",
    meetingDate: "Every Wednesday at 3:00pm to 5:00pm",
    location: "A101",
    approval: "UNAPPROVED",
    status: "DRAFT",
    availability: "OPEN",
    applicationInfo: {
      id: "ckzui2z4g0087znq36co99h48",
      userId: "ckzuhwp8g0032znq3gmfvea9w",
      clubId: "ckzui2z4g0086znq3rxkjr5zc",
      purpose: "purpose of the club",
      membershipRequirements: "must be in good standing",
      dutiesOfMembers: "attend meetings and participate in club events",
      titlesAndDutiesOfOfficers: "idek what this is",
      selectionOfOfficers: "nepotism",
      officerMinimumGPA: 3.2,
      percentAttendanceForOfficialMeeting: 40,
      percentAttendanceToApproveDecision: 51,
      teacher: {
        id: "ckzuhwp8g0032znq3gmfvea9w",
        firstname: "Tyler",
        lastname: "Moulton",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "TEACHER",
        type: "TEACHER",
      },
    },
    links: [
      {
        id: "ckzumjrg30014cfq3riiat1f2",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        name: "Instagram",
        link: "https://instagram.com",
        type: "INSTAGRAM",
      },
      {
        id: "ckzumn3sw0028cfq3632qn0up",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        name: "Twitter",
        link: "https://twitter.com",
        type: "TWITTER",
      },
      {
        id: "ckzunpy6r0033mhq33u81z4sd",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        name: "Our Discord",
        link: "https://discord.com",
        type: "DISCORD",
      },
      {
        id: "ckzunqn9l0047mhq3vi93jb95",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        name: "Youtube",
        link: "https://google.com",
        type: "YOUTUBE",
      },
      {
        id: "ckzunqn9l0047mhq3vi93jb95",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        name: "Facebook",
        link: "https://facebook.com",
        type: "FACEBOOK",
      },
      {
        id: "ckzunqn9l0047mhq3vi93jb95",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        name: "Website",
        link: "https://google.com",
        type: "OTHER",
      },
    ],
    tags: [
      {
        id: "ckzt9ye9k0009pkq3o7lhk5j6",
        name: "math",
      },
      {
        id: "ckzt9ye9k0010pkq3byqiwce2",
        name: "science",
      },
      {
        id: "ckzt9ye9k0011pkq3k1fvtmls",
        name: "engineering",
      },
      {
        id: "ckzt9ye9k0012pkq37wq6kl7o",
        name: "technology",
      },
    ],
    members: [
      {
        id: "ckztb5zqk0066pkq3q7t9t0ye",
        firstname: "Abhinav",
        lastname: "Palacharla",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
        roles: [
          {
            id: "ckzui2z4g0088znq3yp71h3gp",
            name: "president",
            color: "#e16e91",
            clubId: "ckzui2z4g0086znq3rxkjr5zc",
            type: "LEADERSHIP",
          },
          {
            id: "ckzui48dq0206znq3gb2otgn5",
            name: "Portrait Photographer",
            color: "#017c84",
            clubId: "ckzui2z4g0086znq3rxkjr5zc",
            type: "MEMBER",
          },
        ],
      },
      {
        id: "ckztbbjk20082pkq3q96mfs83",
        firstname: "Andrew",
        lastname: "Hale",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
        roles: [
          {
            id: "ckzui2z4g0089znq3io0kz46d",
            name: "vice president",
            color: "#a63ac3",
            clubId: "ckzui2z4g0086znq3rxkjr5zc",
            type: "LEADERSHIP",
          },
        ],
      },
      {
        id: "ckztbfp130098pkq38ssvkdr2",
        firstname: "Paul",
        lastname: "Bokelman",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
        roles: [
          {
            id: "ckzui2z4g0090znq302eht99n",
            name: "secretary",
            color: "#ed4685",
            clubId: "ckzui2z4g0086znq3rxkjr5zc",
            type: "LEADERSHIP",
          },
        ],
      },
      {
        id: "ckztbg3aj0114pkq3hovhgldw",
        firstname: "Wesley",
        lastname: "Chen",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
        roles: [
          {
            id: "ckzui2z4g0091znq3heuy0y2e",
            name: "treasurer",
            color: "#ffc3e0",
            clubId: "ckzui2z4g0086znq3rxkjr5zc",
            type: "LEADERSHIP",
          },
        ],
      },
      {
        id: "ckzuhuvx70000znq3k92kdl2o",
        firstname: "Jordan",
        lastname: "Levy",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SOPHMORE",
        type: "STUDENT",
        roles: [],
      },
      {
        id: "ckzuhuvx70000znq3k92kdl2o",
        firstname: "Jordan",
        lastname: "Levy",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SOPHMORE",
        type: "STUDENT",
        roles: [],
      },
      {
        id: "ckzuhuvx70000znq3k92kdl2o",
        firstname: "Jordan",
        lastname: "Levy",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SOPHMORE",
        type: "STUDENT",
        roles: [],
      },
      {
        id: "ckzuhuvx70000znq3k92kdl2o",
        firstname: "Jordan",
        lastname: "Levy",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SOPHMORE",
        type: "STUDENT",
        roles: [],
      },
      {
        id: "ckzuhvu7a0016znq3c24gv5do",
        firstname: "Ashika",
        lastname: "Palacharla",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "JUNIOR",
        type: "STUDENT",
        roles: [],
      },
    ],
    editors: [
      {
        id: "ckztb5zqk0066pkq3q7t9t0ye",
        firstname: "Abhinav",
        lastname: "Palacharla",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
      },
      {
        id: "ckztbbjk20082pkq3q96mfs83",
        firstname: "Andrew",
        lastname: "Hale",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
      },
      {
        id: "ckztbfp130098pkq38ssvkdr2",
        firstname: "Paul",
        lastname: "Bokelman",
        email: "abhinav.palacharla@gmail.com",
        emailVerified: true,
        password: "testPassword123!",
        grade: "SENIOR",
        type: "STUDENT",
      },
    ],
    roles: [
      {
        id: "ckzui2z4g0088znq3yp71h3gp",
        name: "president",
        color: "#e16e91",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        type: "LEADERSHIP",
      },
      {
        id: "ckzui2z4g0089znq3io0kz46d",
        name: "vice president",
        color: "#a63ac3",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        type: "LEADERSHIP",
      },
      {
        id: "ckzui2z4g0090znq302eht99n",
        name: "secretary",
        color: "#ed4685",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        type: "LEADERSHIP",
      },
      {
        id: "ckzui2z4g0091znq3heuy0y2e",
        name: "treasurer",
        color: "#ffc3e0",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        type: "LEADERSHIP",
      },
      {
        id: "ckzui48dq0206znq3gb2otgn5",
        name: "Portrait Photographer",
        color: "#017c84",
        clubId: "ckzui2z4g0086znq3rxkjr5zc",
        type: "MEMBER",
      },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* {club && ( */}
      <ClubComponent>
        <ClubComponent.Wrapper availability={club.availability}>
          <ClubComponent.Header name={club.name} tags={club.tags} />
          <ClubComponent.Contact email={club.email} links={club.links} />
          <ClubComponent.Meeting
            time={club.meetingDate}
            location={club.location}
            availability={club.availability}
          />
          <ClubComponent.Content description={club.description} />
          <ClubComponent.Members members={club.members} />
          <ClubComponent.SimilarClubs tag={club.tags[0].id} />
        </ClubComponent.Wrapper>
      </ClubComponent>

      {/* )} */}
    </div>
  );
};

// <ClubWrapper>
//   <Title />
//   <pre>{JSON.stringify(club, null, 2)}</pre>
//   {/* <Header name={club.name} members={club.members.length} /> */}
//   {/* <Content {...club} /> */}
// </ClubWrapper>
export default Club;
