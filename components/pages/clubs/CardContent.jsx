import React, { useState, useEffect } from "react";

export const CardContent = ({ name, description }) => {
  const [lineClamp, setLineClamp] = useState(false);
  useEffect(() => {
    if (document.getElementById(name).clientHeight > 38) {
      setLineClamp(true);
    }
  }, [name]);

  return (
    <div className="mt-2 mb-1">
      <h3
        className={`${
          lineClamp ? "line-clamp-2" : "line-clamp-3"
        } text-left text-[17px] `}>
        {description}
      </h3>
    </div>
  );
};
