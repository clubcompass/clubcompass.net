import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { MdLocationOn } from "react-icons/md";
import { BsClock, BsFillPersonFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { BsClockFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { db } from "../../lib/database";
import { CardButton } from "../../components/clubs/Card";

const Club = () => {
  const router = useRouter();
  const [nameLoaded, setNameLoaded] = useState(false);
  const { name } = router.query;

  const {
    data: club,
    error: clubError,
    isLoading: clubLoading,
  } = useQuery("club", async () => await db.get.club.by.slug({ slug: name }), {
    enabled: nameLoaded,
  });

  console.log("name", nameLoaded);
  console.log("clubs", clubLoading);

  useEffect(() => {
    name === undefined ? setNameLoaded(false) : setNameLoaded(true);
  }, [name]);

  if (clubLoading === true) return "Loading...";

  if (clubError) return "An error has occurred: " + clubError.message;

  console.log(club);
  return (
    <div className="flex flex-col">
      {club && (
        <>
          <Header name={club.name} members={club.members.length} />
          <Content {...club} />
        </>
      )}
    </div>
  );
};

const Header = ({ name, members }) => {
  return (
    <div className="mb-9 flex flex-col text-center">
      <div className="mb-1">
        <h1 className="text-3xl font-bold capitalize">
          {name.replace(/-/g, " ")}
        </h1>
      </div>
      <div>
        <Link href="/">
          <a className="text-lg font-semibold text-[#BABEC4] underline underline-offset-2 decoration-2">
            {members} Members
          </a>
        </Link>
      </div>
    </div>
  );
};

const Content = ({
  president,
  image,
  caption,
  email,
  meeting_time,
  meeting_location,
  description,
  link,
  link_name,
  tag_names,
}) => {
  return (
    <div className="lg:grid lg:grid-cols-2 w-[70vw] mx-auto">
      <div>{/* <Carousel image={image} caption={caption} /> */}</div>
      <div className="flex flex-col">
        <Info
          president={president}
          email={email}
          meeting_time={meeting_time}
          meeting_location={meeting_location}
        />
        <Description description={description} />
        <Footer link={link} link_name={link_name} />
      </div>
    </div>
  );
};

const Carousel = ({ image, caption }) => {
  return (
    <div className="mb-3 sm:mr-5 sm:min-h-full">
      <Image
        className="w-full mb-1 sm:min-w-full sm:min-h-full rounded-lg"
        src={image}
        alt="img"
        layout="fill"
      />
      <p className="text-sm text-[#BABEC4]">{caption}</p>
    </div>
  );
};

const Info = ({ president, email, meeting_time, meeting_location }) => {
  const z = "flex mb-2";
  return (
    <div className="text-[#0077ED] font-bold mb-1">
      <div className={z}>
        <BsFillPersonFill className="text-[1.4rem] mr-[.3rem] translate-y-[0.1rem] translate-x-[-0.1rem]" />
        <h4>
          {president.firstname} {president.lastname}
        </h4>
      </div>
      <div className={z}>
        <IoMdMail className="text-[1.3rem] mr-[.5rem] translate-y-[0.15rem]" />
        <h4 className="break-all">{email}</h4>
      </div>
      <div className="xl:flex">
        <div className={`xl:mr-6 ${z}`}>
          <BsClockFill className="h-full text-[1.15rem] mr-[.5rem] translate-y-[0.2rem] translate-x-px" />
          <h4>{meeting_time}</h4>
        </div>
        <div className={z}>
          <MdLocationOn className="text-[1.5rem] mr-[.1rem] translate-x-[-.1rem]" />
          <h4>{meeting_location}</h4>
        </div>
      </div>
    </div>
  );
};

const Description = ({ description }) => {
  return (
    <div className="mb-3">
      <p className="text-[#BABEC4] font-semibold">{description}</p>
    </div>
  );
};

const Footer = ({ link, link_name }) => {
  return (
    <div className="flex justify-between">
      <div className="text-[#0077ED] font-semibold">
        <a
          href={link}
          className="flex underline underline-offset-2 decoration-2"
        >
          {link_name}
          <FiExternalLink className="text-xl stroke-[2.5px] ml-1 translate-y-[.1rem]" />
        </a>
      </div>
      <CardButton />
    </div>
  );
};

export default Club;
