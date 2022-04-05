import React from "react";

type Props = {
  completed: number;
  total: number;
  radius?: number;
  colors?: {
    bg: string;
    fg: string;
  };
};

type CircleProps = {
  color: string;
  percentage?: number;
  radius?: number;
  colors?: {
    bg: string;
    fg: string;
  };
};

export const ProgressCircle = ({
  completed,
  total,
  radius,
  colors = { bg: "#C2C2C2", fg: "#000000" },
}: Props): JSX.Element => {
  const cleanPercentage = (percentage: number): number => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };

  const Circle = ({
    color,
    percentage,
    radius = 20,
  }: CircleProps): JSX.Element => {
    const circumference = 2 * Math.PI * radius;
    const strokePct = ((100 - percentage) * circumference) / 100;
    return (
      <circle
        r={radius}
        cx="50%"
        cy="50%"
        fill="transparent"
        stroke={strokePct !== circumference ? color : ""}
        strokeWidth={`${radius / 35}rem`}
        strokeDasharray={circumference}
        strokeDashoffset={percentage ? strokePct : 0}
        strokeLinecap="round"></circle>
    );
  };

  const pct = cleanPercentage((completed / total) * 100);

  return (
    <svg width="100%" height="100%">
      <g>
        <Circle color={colors.bg} radius={radius} />
        <Circle color={colors.fg} radius={radius} percentage={pct} />
      </g>
    </svg>
  );
};
