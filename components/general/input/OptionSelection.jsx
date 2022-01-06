import React from "react";

export const OptionSelection = ({ options }) => {
  return (
    <div>
      {options.map((name, index) => {
        <div>
          <h1>{name}</h1>
        </div>;
      })}
    </div>
  );
};
