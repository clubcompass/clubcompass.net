import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }) => {
  const mockUser = {
    id: "1",
    name: "Paul Bokelman",
  };
  const [isOpen, toggle] = useState(false);
  const [user, setUser] = useState(null);
  console.log(isOpen);
  const value = {
    user,
    menuOpen: isOpen,
    setMenuState: (value) => toggle(value),
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
