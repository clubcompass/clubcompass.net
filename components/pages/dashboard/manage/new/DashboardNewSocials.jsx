import React from "react";

export const DashboardNewSocials = () => {
  // needs to include link selector, am I missing something?
  // check xd mockup for link selector
  const link = {
    clubId: "cl12yvyjv0056fvpceo1h18nc", // get from route or context query (DOES NOT COME FROM FORM)
    name: "Del Norte Engineering",
    link: "https://www.instagram.com/delnorteengineering/", // valid link (use link validation from schema)
    type: "INSTAGRAM", // OPTIONS: EMAIL, TWITTER, INSTAGRAM, DISCORD, YOUTUBE, FACEBOOK, REMIND, SNAPCHAT, WEBSITE
  };

  return <div>socials</div>;
};
