import type { FC, ReactNode } from "react";
import type { FlexContainerProps } from "./FlexContainer.types";
import classnames from "classnames";

export const FlexContainer: FC<FlexContainerProps> = ({
  row,
  column,
  gap,
  width,
  height,
  className: additionalClasses,
  children,
  ...props
}) => {
  return (
    <div
      style={{
        gap: gap ?? 0,
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
      }}
      className={classnames(
        {
          "flex-row": row,
          "flex-col": column,
        },
        `${additionalClasses} flex`
      )}
      {...props}
    >
      {children}
    </div>
  );
};
