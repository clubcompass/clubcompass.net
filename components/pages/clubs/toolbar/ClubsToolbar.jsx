import React from "react";
import Toolbar from "./Toolbar";

const ClubsToolbar = ({ clubs, staticClubs, updateClubs }) => {
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

export default ClubsToolbar;
