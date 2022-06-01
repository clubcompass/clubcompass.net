import type { ReactNode } from "react";
import { Header } from ".";
type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export const ContentContainer = ({ title, description, children }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Header title={title} description={description} />
      <div>{children}</div>
    </div>
  );
};
