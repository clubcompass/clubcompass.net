import React from "react";
import Link from "next/link";
import Image from "next/image";
import { animated, useTrail, config } from "react-spring";

export const Content = ({ children }) => {
  const items = [
    <Logo key={1} />,
    <FormContent key={2}>{children}</FormContent>,
    <Reserved key={3} />,
  ];

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: "translate(-30px, 0px)" },
    to: { opacity: 1, transform: "translate(0px, 0px)" },
    config: config.wobbly,
  });

  return (
    <div className="w-full flex flex-col h-[80vh] justify-between">
      {trail.map(({ x, ...otherProps }, i) => (
        <animated.div
          key={i}
          style={{
            ...otherProps,
          }}
        >
          {items[i]}
        </animated.div>
      ))}
    </div>
  );
};

const FormContent = ({ children }) => (
  <div>
    <div className="mb-6">
      <h1 className="font-bold text-3xl mb-2">Login</h1>
      <p className="text-gray-500">
        Log in to Club Compass to see and manage your clubs!
      </p>
    </div>

    {children}
    <p className="text-sm mt-4">
      Not registered yet?{" "}
      <Link href="/register">
        <a className="text-cc">Create an account.</a>
      </Link>
    </p>
  </div>
);

const Logo = () => (
  <Link href="/">
    <a className="flex flex-row items-center gap-2 mb-12 cursor-pointer">
      <div>
        <Image src="/cc-auth.svg" alt="auth" width={25} height={25} />
      </div>
      <div className="h-[25px] w-full">
        <p className="text-sm font-bold">Club Compass</p>
      </div>
    </a>
  </Link>
);

const Reserved = () => (
  <div className="h-[25px]">
    <p className="mt-12 text-sm text-gray-500">
      © 2021 Club Compass. All Rights Reserved.
    </p>
  </div>
);
