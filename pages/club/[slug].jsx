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
    id: "ckxr0r0cc00088bq3qfud1mpg",
    name: "Acts of Kindness",
    slug: "acts-of-kindness",
    email: "dnhs.kindness@gmail.com",
    teacher: "Dr. Hall",
    meeting_time: "Fridays at Lunch",
    meeting_location: "A101",
    description:
      "Quis fugiat amet esse. Laboris in minim id et minim proident duis minim ex occaecat. Officia sunt cillum Lorem sunt est commodo enim commodo. Veniam reprehenderit pariatur anim. Laboris ipsum sunt laborum ex ea commodo laborum aute occaecat mollit incididunt consequat reprehenderit culpa cillum. Pariatur sit anim aute anim duis fugiat cupidatat consequat. Enim id dolore voluptate aliquip occaecat cupidatat voluptate et pariatur ipsum velit sit quis. Deserunt velit cupidatat dolore elit ex enim dolor excepteur eiusmod. Amet ut eu culpa sint irure dolor velit Lorem quis ad est nostrud irure ullamco aliqua. Aliqua proident et consectetur anim pariatur non veniam nulla magna ut anim occaecat.",
    membership_requirements: "must attend DNHS",
    duties_of_members: "attend meetings and build stuff",
    titles_and_duties_of_officers: "sodhfodajfoajofzsjf",
    selection_of_officers: "nepotism",
    officer_minimum_gpa: 3.8,
    minimum_percent_of_members_for_meeting: 51,
    minimum_percent_of_members_for_approving_decision: 51,
    president_contact: "somepresidentemail@gmail.com",
    link: "https://www.apple.com",
    link_name: "Our Website",
    instagram_link: "https://www.instagram.com",
    instagram_name: "@poopyface",
    new_members: "Open to new members",
    image_links: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://bestlifeonline.com/wp-content/uploads/sites/3/2019/04/weird-dog-lizard-hybrid.jpg?quality=82&strip=all",
      "http://www.onextrapixel.com/wp-content/uploads/2013/07/shutterstock-1.jpg",
    ],
    image_captions: [
      "This is the team programming and being productive and doing work.",
      "Green tree frog dog.",
      "Intense political debate between two intellectuals.",
    ],
    presidentID: "cc386a57-e963-4370-bd88-2fee59d24c31",
    vicePresidentID: "7358b08f-a146-4e0d-a16d-47046140e4e3",
    secretaryID: "ccba790c-53f2-47db-9b5e-521c52e2b2d5",
    treasurerID: "c55b9d0d-d8ef-4b41-8334-277b30a69a41",
    tags: [
      {
        id: "ckxteyszp00069fq3gvtawa3d",
        name: "writing",
      },
      {
        id: "ckxr00ic42156rbq3ljcq6jd0",
        name: "debate",
      },
      {
        id: "ckxr00ic42159rbq389f3210j",
        name: "education",
      },
    ],
    president: {
      id: "cc386a57-e963-4370-bd88-2fee59d24c31",
      firstname: "Mcneil",
      lastname: "Blanchard",
      email: "mcneilblanchard@turnling.com",
    },
    vicePresident: {
      id: "7358b08f-a146-4e0d-a16d-47046140e4e3",
      firstname: "Wyatt",
      lastname: "Gilliam",
      email: "wyattgilliam@turnling.com",
    },
    secretary: {
      id: "ccba790c-53f2-47db-9b5e-521c52e2b2d5",
      firstname: "Paige",
      lastname: "Nixon",
      email: "paigenixon@turnling.com",
    },
    treasurer: {
      id: "c55b9d0d-d8ef-4b41-8334-277b30a69a41",
      firstname: "Strickland",
      lastname: "Sullivan",
      email: "stricklandsullivan@turnling.com",
    },
    members: [
      {
        id: "6a47c08a-8382-4695-9987-770723fea3bf",
        firstname: "Bonner",
        lastname: "Mercado",
        email: "bonnermercado@turnling.com",
      },
      {
        id: "8f891c77-ae41-493a-bc52-d0c16da0354d",
        firstname: "Allie",
        lastname: "Henson",
        email: "alliehenson@turnling.com",
      },
      {
        id: "2cacd023-db5b-4dc0-9cca-6a1565a652a2",
        firstname: "Dixie",
        lastname: "Maddox",
        email: "dixiemaddox@turnling.com",
      },
      {
        id: "7ca72e22-36bb-49bb-812d-19a9c868a5b3",
        firstname: "Newman",
        lastname: "Wagner",
        email: "newmanwagner@turnling.com",
      },
      {
        id: "ed50396e-2fcd-4557-ac50-977b41afc6cb",
        firstname: "Mcgowan",
        lastname: "Heath",
        email: "mcgowanheath@turnling.com",
      },
      {
        id: "10592315-7ac9-4d72-b950-e059f264a26f",
        firstname: "Jami",
        lastname: "Kirkland",
        email: "jamikirkland@turnling.com",
      },
      {
        id: "6f6a0f97-90d1-4a93-a712-76706abca5bd",
        firstname: "Moss",
        lastname: "Dalton",
        email: "mossdalton@turnling.com",
      },
      {
        id: "d3943eab-911d-4b1b-aca9-a43affae41ac",
        firstname: "Carly",
        lastname: "Rojas",
        email: "carlyrojas@turnling.com",
      },
      {
        id: "74978a35-fbf3-48c3-a7d6-57439715a60f",
        firstname: "Concepcion",
        lastname: "Klein",
        email: "concepcionklein@turnling.com",
      },
      {
        id: "8aab9fd9-3fdd-4cf7-83ce-1e70ebbd7a36",
        firstname: "Gallegos",
        lastname: "Hinton",
        email: "gallegoshinton@turnling.com",
      },
      {
        id: "1ff59e27-cd1b-4904-b20e-fd28953daf44",
        firstname: "Mendez",
        lastname: "Walter",
        email: "mendezwalter@turnling.com",
      },
      {
        id: "91b1b943-93e5-443d-a670-564bb830b11c",
        firstname: "Winters",
        lastname: "Huffman",
        email: "wintershuffman@turnling.com",
      },
      {
        id: "3d993c26-f513-412a-9f13-21c29263a2ad",
        firstname: "Fry",
        lastname: "Perry",
        email: "fryperry@turnling.com",
      },
      {
        id: "d5c80abe-0430-481f-86f6-102fff9e765d",
        firstname: "Bray",
        lastname: "Ashley",
        email: "brayashley@turnling.com",
      },
      {
        id: "0ecb040d-6b3e-48ba-82d8-7366d9b14191",
        firstname: "Austin",
        lastname: "Ochoa",
        email: "austinochoa@turnling.com",
      },
      {
        id: "36bce5eb-3e45-415d-bbc6-c64c20f28e08",
        firstname: "Molina",
        lastname: "Stevens",
        email: "molinastevens@turnling.com",
      },
      {
        id: "04c4efd4-1cb2-405a-92ec-ca4be3ab6a97",
        firstname: "Edwina",
        lastname: "Rice",
        email: "edwinarice@turnling.com",
      },
      {
        id: "59a1e890-79a3-48b0-967b-bac82c36540f",
        firstname: "Sondra",
        lastname: "Hobbs",
        email: "sondrahobbs@turnling.com",
      },
      {
        id: "86dffedb-8887-4b0b-aa9d-d628cef53673",
        firstname: "Jenkins",
        lastname: "Dawson",
        email: "jenkinsdawson@turnling.com",
      },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* {club && ( */}
      <ClubComponent>
        <ClubComponent.Wrapper>
          <ClubComponent.Header name={club.name} tags={club.tags} />
          <ClubComponent.Contact
            email={club.president.email}
            website={{ name: club.link_name, link: club.link }}
            instagram={{ name: club.instagram_name, link: club.instagram_link }}
          />
          <ClubComponent.Meeting
            time={club.meeting_time}
            location={club.meeting_location}
            new_members={club.new_members}
          />
          <ClubComponent.Content description={club.description} />
          <ClubComponent.Members
            president={club.president}
            vicePresident={club.vicePresident}
            secretary={club.secretary}
            treasurer={club.treasurer}
            members={club.members}
          />
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
