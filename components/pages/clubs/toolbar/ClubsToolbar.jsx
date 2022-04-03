import React from "react";
import { Toolbar } from ".";

export const ClubsToolbar = ({ clubs, staticClubs, updateClubs }) => {
  // TODO: Persist sort when filtering
  return (
    <Toolbar>
      <Toolbar.Container>
        <Toolbar.Sort clubs={clubs} updateClubs={updateClubs} />
        <Toolbar.Filter staticClubs={staticClubs} updateClubs={updateClubs} />
        <Toolbar.Search staticClubs={staticClubs} updateClubs={updateClubs} />
      </Toolbar.Container>
    </Toolbar>
  );
};
