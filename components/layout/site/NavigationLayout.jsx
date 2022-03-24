import React from "react";
import {
  LayoutProvider,
  ToastProvider,
  useLayoutContext,
} from "../../../context";
import { Nav, Footer } from ".";
export const NavigationLayout = ({ children }) => {
  return (
    <ToastProvider>
      <LayoutProvider>
        <NavigationLayoutContainer>
          <Nav />
          <div className="px-6 lg:px-16">{children}</div>
          <Footer />
        </NavigationLayoutContainer>
      </LayoutProvider>
    </ToastProvider>
  );
};

const NavigationLayoutContainer = ({ children }) => {
  const { menuOpen } = useLayoutContext();
  return (
    <div
      className={`${
        menuOpen && "fixed h-full overflow-hidden"
      } flex flex-col justify-between`}
    >
      {children}
    </div>
  );
};
