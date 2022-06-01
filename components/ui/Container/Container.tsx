import type { FC } from "react";
import type { ContainerProps } from "./Container.types";
import classnames from "classnames";
import _ from "lodash";
import { inferStyledValue } from "../utils";

export const Container: FC<ContainerProps> = ({
  width,
  height,
  padding,
  margin,
  border,
  className: additionalClasses,
  style,
  children,
  ...props
}) => {
  const base = {};

  const defaults = {
    width: "100%",
    height: "100%",
    padding: "0",
    margin: "0",
    border: { width: "2px", radius: "8px", color: "#DDDDDD" },
  };

  const { borderRadius, borderWidth, borderColor } = {
    borderRadius:
      typeof border !== "boolean"
        ? _.has(border, "radius") &&
          inferStyledValue(border.radius, defaults.border.radius)
        : defaults.border.radius,
    borderWidth:
      typeof border !== "boolean"
        ? _.has(border, "width") &&
          inferStyledValue(border.width, defaults.border.width)
        : defaults.border.width,
    borderColor:
      typeof border !== "boolean"
        ? _.has(border, "color") &&
          inferStyledValue(border.color, defaults.border.color)
        : defaults.border.color,
  };

  return (
    <div
      style={{
        width: width
          ? typeof width === "number"
            ? `${width}px`
            : width
          : "100%",
        height: height
          ? typeof height === "number"
            ? `${height}px`
            : height
          : "100%",
        borderWidth,
        borderRadius,
        borderColor,
      }}
      className={classnames(
        {
          //   "flex-row": row,
          //   "flex-col": column,
        },
        `${additionalClasses}`
      )}
      {...props}
    >
      {children}
    </div>
  );
};
