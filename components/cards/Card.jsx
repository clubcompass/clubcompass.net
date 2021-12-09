import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import { Tags } from "../tags";
import { Icons } from "./icons";
export const Card = ({ name, description, primaryTag, tags, slug }) => {
  return (
    <Container>
      <div>
        <Header primaryTag={primaryTag} tags={tags} name={name} />
        <Content description={description} name={name} />
      </div>
      <Footer slug={name.replace(/\s+/g, "-").toLowerCase()} />
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex flex-col justify-between w-[464px] h-[268px] bg-white border-2 border-[#ECF2F5] drop-shadow-md p-6 mb-2 rounded-[1.5rem]">
    {children}
  </div>
);

const Header = ({ name, primaryTag, tags }) => (
  <div className="w-full flex flex-col">
    <div className="w-full flex flex-row justify-between">
      <div className="w-[38px] h-[38px]">{Icons[primaryTag]}</div>
      <Tags tags={tags} />
    </div>
    <div className="my-2">
      <h3 id={name} className="font-bold text-[30px] leading-tight">
        {name}
      </h3>
    </div>
  </div>
);

const Content = ({ name, description }) => {
  const [lineClamp, setLineClamp] = useState(false);
  useEffect(() => {
    if (document.getElementById(name).clientHeight > 38) {
      setLineClamp(true);
    }
  }, []);

  console.log(name, lineClamp);

  return (
    <div className="mt-1">
      <h3
        className={`${
          lineClamp ? "line-clamp-2" : "line-clamp-3"
        } font-bold text-left text-[17px] text-[#DFE3EA]`}
      >
        {description}
      </h3>
    </div>
  );
};

const Footer = ({ slug }) => (
  <div className="w-full flex flex-row justify-between">
    <Link href={`/clubs/${slug}`}>
      <a className="font-bold text-[#2575E5]">View details</a>
    </Link>
    <CardButton />
  </div>
);

const CardButton = () => {
  const [joined, setJoined] = useState(false);

  return (
    <button
      className={`${
        joined ? "bg-[#FF5555]" : "bg-[#2575E5]"
      } flex flex-row justify-center items-center gap-1 rounded-lg px-5 py-0.5`}
      onClick={() => setJoined(!joined)}
    >
      {joined ? (
        <>
          <FiLogOut className="text-white text-sm stroke-[4px] " />
          <span className="font-bold text-[15px] text-white">Leave</span>
        </>
      ) : (
        <>
          <HiPlusSm className="text-white text-md stroke-[1.5px]" />
          <span className="font-bold text-[15px] text-white">Join</span>
        </>
      )}
    </button>
  );
};
