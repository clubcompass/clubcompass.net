import React from "react";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-2">
      <div className="mb-10 p-3 relative bg-[#E7EEFF] rounded-xl">
        <div className="mt-[4px] mx-[5px]">
          <Image src="/cc-404.svg" alt="logo" width={64} height={64} />
        </div>
      </div>
      <p className="font-bold text-cc tracking-wider text-lg">404 ERROR</p>
      <h1 className="font-extrabold text-black text-3xl md:text-5xl mb-2">
        Page not found.
      </h1>
      <p className="text-[#6D7481] text-center tracking-wider mb-6 text-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <a href="/ " className="font-semibold text-cc tracking-wide text-lg">
        Go back home &rarr;
      </a>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      navigationLayout: false,
    },
  };
};

export default Custom404;
