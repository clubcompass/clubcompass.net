import type { ReactNode } from "react";

export interface FlexContainerProps {
  row?: boolean;
  column?: boolean;
  gap?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  children: ReactNode;
}
