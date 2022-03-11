import { expect } from "chai";
import { club } from "./clubUnitApi";

describe("unique club", () => {
  describe("findClubBySlug", () => {
    it("fetches club by slug", async () => {
      const clubBySlug = await club.findClubBySlug({ slug: "ace-club" });

      expect(clubBySlug).have.to.have.keys(
        "name",
        "description",
        "meetingDate",
        "location",
        "availability",
        "approval",
        "links",
        "members",
        "tags"
      );
    });
  });
});
