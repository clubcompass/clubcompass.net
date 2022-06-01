import type { ReactNode, CSSProperties } from "react";

export type ContainerProps = {
  width?: string | number;
  height?: string | number;
  padding?: PaddingProps | string | boolean;
  margin?: MarginProps | string | boolean;
  border?: BorderProps | boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

type BorderProps = {
  width?: string | number;
  radius?: number | boolean;
  color?: string;
};

type PaddingProps = {
  t: string | number;
  r: string | number;
  b: string | number;
  l: string | number;
};

type MarginProps = {
  t: string | number;
  r: string | number;
  b: string | number;
  l: string | number;
};
