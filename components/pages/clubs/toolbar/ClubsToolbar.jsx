import React, { useState } from "react";
import { Toolbar } from ".";

export const ClubsToolbar = ({ clubs, updateClubs }) => {
  const [sortOptions, setSortOptions] = useState({
    category: "alpha",
    order: "desc",
  });
  return (
    <Toolbar>
      <Toolbar.Container>
        <Toolbar.Sort
          clubs={clubs}
          updateClubs={updateClubs}
          updateGlobalSortOptions={setSortOptions}
        />
        <Toolbar.Filter sortOptions={sortOptions} />
        <Toolbar.Search />
      </Toolbar.Container>
    </Toolbar>
  );
};
