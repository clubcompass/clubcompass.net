import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import blobs from "blobs";
import { useTrail, useSpring, animated, config } from "react-spring";

export const Graphic = () => {
  const items = [
    <Text key={1} />,
    <People key={2} />,
    <Blobs key={3} />,
    <Cards key={4} />,
    <Circles key={5} />,
    <DottedCircles key={6} />,
  ];

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: "translate(30px, 0px)" },
    to: { opacity: 1, transform: "translate(0px, 0px)" },
    config: config.wobbly,
  });

  return (
    <div className="hidden overflow-hidden relative md:flex items-center justify-center w-full h-full bg-gradient-to-bl from-cc-temp to-cc">
      <div className="flex flex-col items-center justify-center text-white">
        {trail.map(({ x, ...otherProps }, i) => (
          <animated.div
            className="absolute"
            key={i}
            style={{
              ...otherProps,
            }}
          >
            {items[i]}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

const Text = () => (
  <div className="text-center z-50">
    <Image src="/cc.svg" alt="cc" width={65} height={65} />
    <h2 className="uppercase text-5xl font-extrabold my-4">Club Compass</h2>
    <p className="uppercase font-bold">Redefining club discovery</p>
  </div>
);

const Blobs = () => {
  const { maxOpacity, minOpacity } = { maxOpacity: 0.06, minOpacity: 0.03 };
  const frames = [
    {
      start: { x: 120, y: 210 },
      stray: { x: 100, y: 100 },
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
    },
    {
      start: { x: -290, y: 320 },
      stray: { x: 60, y: 60 },
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
    },
    {
      start: { x: -290, y: -180 },
      stray: { x: 120, y: 50 },
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
    },
    {
      start: { x: 220, y: -250 },
      stray: { x: 120, y: 50 },
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
    },
  ];

  const Blob = ({ start, stray, opacity }) => {
    const { width, height } = useMemo(() => {
      const s = Math.floor(Math.random() * (300 - 150) + 150);
      return {
        height: s,
        width: s,
      };
    }, []);

    const [pos, setPos] = useState(start);
    const options = useMemo(() => {
      return {
        complexity: 0.3,
        contrast: 0.6,
        guides: true,
        size: 1000,
        color: "hsl(6.13, 73.23%, 49.8%)",
        stroke: 0,
      };
    }, []);
    const [blob, change] = useState(blobs.editable(options));

    const p = useSpring({
      config: { duration: 5000, ...config.molasses },
      svg: blob.children[0].children[0].attributes.d,
      fill: blob.children[0].children[0].attributes.fill,
    });

    const updateBlob = useCallback(() => {
      return change(blobs.editable(options));
    }, [options]);

    const updateBlobPosition = useCallback(() => {
      const newP = {
        x: Math.floor(Math.random() * stray.x) + start.x,
        y: Math.floor(Math.random() * stray.y) + start.y,
      };
      setPos(newP);
    }, [stray, start]);

    useEffect(() => {
      const interval = setInterval(updateBlob, 2000);
      return () => {
        clearInterval(interval);
      };
    }, [updateBlob]);

    useEffect(() => {
      updateBlobPosition();
      const interval = setInterval(() => {
        updateBlobPosition();
      }, 4000);
      return () => {
        clearInterval(interval);
      };
    }, [updateBlobPosition]);

    return (
      <svg
        viewBox="0 0 800 800"
        width={width}
        height={height}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="absolute transition duration-[6000ms] ease-in-out"
      >
        <g transform="translate(-100,-100)">
          <animated.path d={p.svg} fill={`rgba(255,255,255,${opacity})`} />
        </g>
      </svg>
    );
  };

  return (
    <div className="absolute flex flex-wrap justify-center items-center">
      {frames.map((frame, i) => (
        <Blob {...frame} key={i} />
      ))}
    </div>
  );
};

const People = () => {
  const frames = [
    {
      start: { x: -220, y: 80 },
      stray: { x: 20, y: 20 },
    },
    {
      start: { x: 200, y: 200 },
      stray: { x: 30, y: 30 },
    },
    {
      start: { x: 200, y: -220 },
      stray: { x: 30, y: 30 },
    },
  ];

  const Person = ({ start, stray }) => {
    const [pos, setPos] = useState(start);

    const { width, height } = useMemo(() => {
      const s = Math.floor(Math.random() * (50 - 40) + 40);
      return {
        height: s,
        width: s,
      };
    }, []);

    const updatePosition = useCallback(() => {
      const newP = {
        x: Math.floor(Math.random() * stray.x) + start.x,
        y: Math.floor(Math.random() * stray.y) + start.y,
      };
      setPos(newP);
    }, [stray, start]);

    useEffect(() => {
      updatePosition();
      const interval = setInterval(updatePosition, 3500);
      return () => {
        clearInterval(interval);
      };
    }, [updatePosition]);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 94 94"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="absolute z-10 transition duration-[5500ms] ease-in-out"
      >
        <path
          id="Path_133"
          data-name="Path 133"
          d="M9.654,93.847S2,93.847,2,86.193,9.654,55.578,47.924,55.578,93.847,78.54,93.847,86.193s-7.654,7.654-7.654,7.654Zm38.27-45.924A22.962,22.962,0,1,0,24.962,24.962,22.962,22.962,0,0,0,47.924,47.924Z"
          transform="translate(-2 -2)"
          fill="#3c77ff"
        />
      </svg>
    );
  };

  return (
    <div className="absolute flex flex-wrap justify-center items-center">
      {frames.map((frame, i) => (
        <Person {...frame} key={i} />
      ))}
    </div>
  );
};

const Cards = () => {
  const frames = [
    {
      start: { x: -110, y: 240 },
      stray: { x: 20, y: 20 },
    },
    {
      start: { x: 220, y: 110 },
      stray: { x: 30, y: 30 },
    },
    {
      start: { x: -200, y: -200 },
      stray: { x: 30, y: 30 },
    },
  ];

  const Card = ({ start, stray }) => {
    const [pos, setPos] = useState(start);

    const { width, height } = useMemo(() => {
      const s = Math.floor(Math.random() * (180 - 150) + 150);
      return {
        height: s * 0.668085106,
        width: s,
      };
    }, []);

    const updatePosition = useCallback(() => {
      const newP = {
        x: Math.floor(Math.random() * stray.x) + start.x,
        y: Math.floor(Math.random() * stray.y) + start.y,
      };
      setPos(newP);
    }, [stray, start]);

    useEffect(() => {
      updatePosition();
      const interval = setInterval(updatePosition, 4000);
      return () => {
        clearInterval(interval);
      };
    }, [updatePosition]);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 235 157"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="absolute z-10 transition duration-[6000ms] ease-in-out"
      >
        <g
          id="Group_383"
          data-name="Group 383"
          transform="translate(-1597 -842)"
        >
          <rect
            id="Rectangle_1511"
            data-name="Rectangle 1511"
            width="235"
            height="157"
            rx="17"
            transform="translate(1597 842)"
            fill="#3470fa"
          />
          <rect
            id="Rectangle_1512"
            data-name="Rectangle 1512"
            width="128"
            height="21"
            rx="10.5"
            transform="translate(1615 900)"
            fill="rgba(255,255,255,0.25)"
          />
          <rect
            id="Rectangle_1513"
            data-name="Rectangle 1513"
            width="175"
            height="11"
            rx="5.5"
            transform="translate(1615 930)"
            fill="rgba(255,255,255,0.11)"
          />
          <rect
            id="Rectangle_1514"
            data-name="Rectangle 1514"
            width="175"
            height="11"
            rx="5.5"
            transform="translate(1615 946)"
            fill="rgba(255,255,255,0.11)"
          />
          <rect
            id="Rectangle_1516"
            data-name="Rectangle 1516"
            width="39"
            height="11"
            rx="5.5"
            transform="translate(1615 973)"
            fill="rgba(255,255,255,0.11)"
          />
          <rect
            id="Rectangle_1517"
            data-name="Rectangle 1517"
            width="39"
            height="11"
            rx="5.5"
            transform="translate(1771 973)"
            fill="#4c80fc"
          />
          <rect
            id="Rectangle_1518"
            data-name="Rectangle 1518"
            width="34"
            height="34"
            rx="17"
            transform="translate(1615 858)"
            fill="rgba(255,255,255,0.25)"
          />
          <rect
            id="Rectangle_1519"
            data-name="Rectangle 1519"
            width="27"
            height="9"
            rx="4.5"
            transform="translate(1783 858)"
            fill="rgba(255,255,255,0.11)"
          />
          <rect
            id="Rectangle_1520"
            data-name="Rectangle 1520"
            width="20"
            height="9"
            rx="4.5"
            transform="translate(1790 871)"
            fill="rgba(255,255,255,0.11)"
          />
          <rect
            id="Rectangle_1521"
            data-name="Rectangle 1521"
            width="27"
            height="9"
            rx="4.5"
            transform="translate(1751 858)"
            fill="rgba(255,255,255,0.11)"
          />
          <rect
            id="Rectangle_1522"
            data-name="Rectangle 1522"
            width="35"
            height="9"
            rx="4.5"
            transform="translate(1751 871)"
            fill="rgba(255,255,255,0.11)"
          />
        </g>
      </svg>
    );
  };

  return (
    <div className="absolute flex flex-wrap justify-center items-center">
      {frames.map((frame, i) => (
        <Card {...frame} key={i} />
      ))}
    </div>
  );
};

const Circles = () => {
  const frames = [
    {
      start: { x: -260, y: 160 },
      stray: { x: 20, y: 20 },
      constraints: {
        size: {
          min: 100,
          max: 120,
        },
        stroke: {
          min: 6,
          max: 8,
        },
      },
    },
    {
      // bottom right
      start: { x: 100, y: 270 },
      stray: { x: 26, y: 26 },
      constraints: {
        size: {
          min: 30,
          max: 60,
        },
        stroke: {
          min: 12,
          max: 18,
        },
      },
    },
    {
      // top right
      start: { x: 140, y: -120 },
      stray: { x: 30, y: 30 },
      constraints: {
        size: {
          min: 30,
          max: 60,
        },
        stroke: {
          min: 8,
          max: 13,
        },
      },
    },
    {
      // top left
      start: { x: -190, y: -330 },
      stray: { x: 30, y: 30 },
      constraints: {
        size: {
          min: 90,
          max: 100,
        },
        stroke: {
          min: 9,
          max: 11,
        },
      },
    },
  ];

  const Circle = ({ start, stray, constraints: { size, stroke } }) => {
    const [pos, setPos] = useState(start);

    const { width, height } = useMemo(() => {
      const s = Math.floor(Math.random() * (size.max - size.min) + size.min);
      return {
        height: s,
        width: s,
      };
    }, [size]);

    const strokeWidth = useMemo(() => {
      const s = Math.floor(
        Math.random() * (stroke.max - stroke.min) + stroke.min
      );
      return s;
    }, [stroke]);

    const updatePosition = useCallback(() => {
      const newP = {
        x: Math.floor(Math.random() * stray.x) + start.x,
        y: Math.floor(Math.random() * stray.y) + start.y,
      };
      setPos(newP);
    }, [stray, start]);

    useEffect(() => {
      updatePosition();
      const interval = setInterval(updatePosition, 4000);
      return () => {
        clearInterval(interval);
      };
    }, [updatePosition]);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 73 73"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="absolute z-0 transition duration-[6000ms] ease-in-out"
      >
        <g
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        >
          <circle cx="36.5" cy="36.5" r="36.5" stroke="none" />
          <circle cx="36.5" cy="36.5" r="30" fill="none" />
        </g>
      </svg>
    );
  };

  return (
    <div className="absolute flex flex-wrap justify-center items-center">
      {frames.map((frame, i) => (
        <Circle {...frame} key={i} />
      ))}
    </div>
  );
};

const DottedCircles = () => {
  const frames = [
    {
      start: { x: 120, y: -370 },
      stray: { x: 15, y: 15 },
      constraints: {
        size: {
          min: 170,
          max: 180,
        },
        stroke: {
          min: 7,
          max: 8,
        },
      },
    },
  ];

  const DottedCircle = ({ start, stray, constraints: { size, stroke } }) => {
    const [pos, setPos] = useState(start);

    const { width, height } = useMemo(() => {
      const s = Math.floor(Math.random() * (size.max - size.min) + size.min);
      return {
        height: s,
        width: s,
      };
    }, [size]);

    const strokeWidth = useMemo(() => {
      const s = Math.floor(
        Math.random() * (stroke.max - stroke.min) + stroke.min
      );
      return s;
    }, [stroke]);

    const updatePosition = useCallback(() => {
      const newP = {
        x: Math.floor(Math.random() * stray.x) + start.x,
        y: Math.floor(Math.random() * stray.y) + start.y,
      };
      setPos(newP);
    }, [stray, start]);

    useEffect(() => {
      updatePosition();
      const interval = setInterval(updatePosition, 4000);
      return () => {
        clearInterval(interval);
      };
    }, [updatePosition]);

    return (
      <div
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="absolute z-0 transition duration-[6000ms] ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 73 73"
          className="animate-spin-slow"
        >
          <g
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
          >
            <circle
              strokeDasharray="10,10"
              cx="36.5"
              cy="36.5"
              r="36.5"
              stroke="none"
            />
            <circle
              strokeDasharray="10,10"
              cx="36.5"
              cy="36.5"
              r="30"
              fill="none"
            />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div className="absolute flex flex-wrap justify-center items-center">
      {frames.map((frame, i) => (
        <DottedCircle {...frame} key={i} />
      ))}
    </div>
  );
};
