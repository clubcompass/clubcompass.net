import React from "react";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-6 p-4 relative bg-[#E7EEFF] rounded-xl">
        <div className="mt-[6px] mx-[3px]">
          <Image src="/cc-404.svg" alt="logo" width={100} height={100} />
        </div>
      </div>
      <p className="font-bold text-[#1C5EF9] tracking-wider text-lg">
        404 ERROR
      </p>
      <h1 className="font-extrabold text-black text-6xl mb-2">
        Page not found.
      </h1>
      <p className="text-[#6D7481] tracking-wider mb-6 text-lg">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <p className="font-semibold text-[#1C5EF9] tracking-wide text-lg">
        Go back home &rarr;
      </p>
    </div>
  );
};

export default Custom404;
