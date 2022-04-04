import React, { useState } from "react";
import { useAuthContext } from "../../../../context";
import { BiArrowToRight } from "react-icons/bi";

export const DashboardNavProfile = () => {
  const [hover, setHover] = useState(false);
  const { loading, user, logout } = useAuthContext();

  const showTip = () => {
    setHover(!hover);
  };

  return (
    <div className="flex items-center justify-center">
      {user ? (
        <>
          <div className="flex items-center">
            <div
              onClick={logout}
              onMouseEnter={showTip}
              onMouseLeave={showTip}
              className="flex cursor-pointer items-center justify-center rounded-full border p-1 md:p-2">
              <BiArrowToRight className="text-lg text-[#787F92] md:text-2xl" />
            </div>
            <div className="-translate-y-3">
              {hover && <Label label="Logout" />}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const Label = ({ label }) => {
  return (
    <div className="relative">
      <div className="absolute ml-2 flex items-center">
        <span className="h-0 w-0 border-t-4 border-b-4 border-r-4 border-b-transparent border-r-black border-t-transparent" />
        <p className="whitespace-nowrap rounded-md bg-black px-4 text-white">
          {label}
        </p>
      </div>
    </div>
  );
};
