import React, { useEffect, useState } from "react";
import { animated, useTransition, config } from "react-spring";
export const ClubCarousel = ({ images, captions }) => {
  const [index, set] = useState(0);
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 800, ...config.wobbly },
  });

  useEffect(() => {
    const interval = setInterval(
      () => set((state) => (state + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative">
      <div className="relative right-6 flex flex-row items-center gap-4 w-full h-[305.13px]">
        <div className="flex flex-col gap-3 h-1/2">
          <span
            className={`${
              index === 0 ? "bg-[#BABEC4]" : "bg-[#707070] bg-opacity-10"
            } bg-[#BABEC4] w-1.5 h-full rounded-xl cursor-pointer transition duration-500 ease-in-out`}
            onClick={() => set(0)}
          />
          <span
            className={`${
              index === 1 ? "bg-[#BABEC4]" : "bg-[#707070] bg-opacity-10"
            } bg-[#BABEC4] w-1.5 h-full rounded-xl cursor-pointer transition duration-500 ease-in-out`}
            onClick={() => set(1)}
          />
          <span
            className={`${
              index === 2 ? "bg-[#BABEC4]" : "bg-[#707070] bg-opacity-10"
            } bg-[#BABEC4] w-1.5 h-full rounded-xl cursor-pointer transition duration-500 ease-in-out`}
            onClick={() => set(2)}
          />
        </div>
        <div className="relative">
          {transitions((style, i) => (
            <animated.div
              style={style}
              className="relative top-4 flex flex-col w-full h-full"
            >
              <img
                src={images[i]}
                alt={captions[i]}
                className="rounded-xl w-[458.19px] h-[305.13px] object-cover"
              />
              <p className="mt-2 text-sm text-[#444444]" style={style}>
                {captions[i]}
              </p>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};
