import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { HiPlusSm, HiChevronRight } from "react-icons/hi";
import { Tags } from "../tags";
import { tagSchema } from "../tags";
import { Icons } from "../icons";
export const Card = ({ name, description, tags, slug }) => {
  return (
    // <div>
    //   <h1>{name}</h1>
    // </div>
    <Container>
      <Header primaryTag={tags[0].tag.name} tags={tags} name={name} />
      <Content description={description} name={name} />
      <Footer slug={name.replace(/\s+/g, "-").toLowerCase()} />
    </Container>
  );
};

const Container = ({ children }) => {
  const [header, content, footer] = children;
  return (
    <div className="flex flex-col justify-between bg-white drop-shadow-md hover:drop-shadow-xl p-6 mb-2 rounded-xl w-[440px]  transition duration-300 ease-in-out">
      <div>
        {header}
        {content}
      </div>
      {footer}
    </div>
  );
};

const Icon = ({ icon }) => {
  const { bg, fg } = tagSchema[icon];
  return (
    <div style={{ backgroundColor: bg }} className="p-3 rounded-lg">
      {Icons[icon]({ className: "text-2xl", style: { color: fg } })}
    </div>
  );
};

const Header = ({ name, primaryTag, tags }) => (
  <div className="relative flex flex-row justify-between items-center">
    <div className="flex flex-col">
      <h3
        id={name}
        className="font-bold text-[25px] leading-tight mb-2 max-w-[21rem]"
      >
        {name}
      </h3>
      <Tags tags={tags} />
    </div>
    <div className="absolute right-0">
      <Icon icon={primaryTag} />
    </div>
  </div>
);

const Content = ({ name, description }) => {
  const [lineClamp, setLineClamp] = useState(false);
  useEffect(() => {
    if (document.getElementById(name).clientHeight > 38) {
      setLineClamp(true);
    }
  }, [name]);

  return (
    <div className="mt-2 mb-1 w-[90%]">
      <h3
        className={`${
          lineClamp ? "line-clamp-2" : "line-clamp-3"
        } text-left text-[17px] `}
      >
        {description}
      </h3>
    </div>
  );
};

const Footer = ({ slug }) => (
  <div className="w-full flex flex-row justify-between">
    <Details slug={slug} />
    <CardButton />
  </div>
);

const Details = ({ slug }) => {
  return (
    <Link href={`/club/${slug}`}>
      <a className="font-bold text-[#2575E5]">
        <div className="relative flex flex-row items-end left-1 group transition duration-200 ease-in-out">
          Learn more <HiChevronRight className="text-lg relative bottom-0.5" />
          <span className="absolute bg-cc/10 w-[90%] h-2 group-hover:h-[1.2rem] rounded-sm -left-1 bottom-0.5 transition-height duration-200 ease-in-out" />
        </div>
      </a>
    </Link>
  );
};

export const CardButton = () => {
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
