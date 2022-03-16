import { expect } from "chai";
import { getClub, getClubs, joinClub } from "./clubUnitApi";

describe("findClubBySlug", () => {
  it("fetches club by slug", async () => {
    const club = await getClub({ slug: "ace-club" });

    expect(club).have.to.have.keys(
      "id",
      "name",
      "description",
      "meetingDate",
      "location",
      "availability",
      "links",
      "members",
      "tags",
      "_count"
    );
  });
});

describe("findAllClubs", () => {
  it("fetches all clubs", async () => {
    const clubs = await getClubs({});

    clubs.map((club) => {
      expect(club).have.to.have.keys(
        "id",
        "slug",
        "name",
        "description",
        "availability",
        "tags",
        "_count"
      );
    });
  });
});

// describe("joinClub", () => {
//   it("joins a club", async () => {
//     const user = await joinClub({ clubId: 5 });

//     console.log(user);
//   });
// });
