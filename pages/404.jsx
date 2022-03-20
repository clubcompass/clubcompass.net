import React from "react";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative mb-10 rounded-xl bg-[#E7EEFF] p-3">
        <div className="mx-[5px] mt-[4px]">
          <Image src="/cc-404.svg" alt="logo" width={64} height={64} />
        </div>
      </div>
      <p className="text-lg font-bold tracking-wider text-cc">404 ERROR</p>
      <h1 className="mb-2 text-5xl font-extrabold text-black">
        Page not found.
      </h1>
      <p className="text-md mb-6 tracking-wider text-[#6D7481]">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <a href="/ " className="text-lg font-semibold tracking-wide text-cc">
        Go back home &rarr;
      </a>
    </div>
  );
};

export default Custom404;
