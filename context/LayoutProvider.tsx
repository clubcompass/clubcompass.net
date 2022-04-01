import React, { createContext, ReactChild, useContext, useState } from "react";

interface LayoutContext {
  menuOpen: boolean;
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContext>({
  menuOpen: false,
  setMenuState: (): void => {},
});

export const useLayoutContext = (): LayoutContext => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }: { children: ReactChild[] }) => {
  const [isOpen, toggle] = useState<boolean>(false);
  const value = {
    menuOpen: isOpen,
    setMenuState: (value: boolean) => toggle(value),
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
