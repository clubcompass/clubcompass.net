import type { ReactNode } from "react";
import { ManagementProvider } from "./context/ManagementProvider.new";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <ManagementProvider>
      <div className="mx-[178px] my-[244px] flex flex-row items-start gap-20">
        {children}
      </div>
    </ManagementProvider>
  );
};
