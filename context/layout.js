import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }) => {
  const [isOpen, toggle] = useState(false);
  const value = {
    menuOpen: isOpen,
    setMenuState: (value) => toggle(value),
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
