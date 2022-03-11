import { expect } from "chai";
import { club } from "./clubUnitApi";

describe("approved clubs", () => {
  describe("findManyClubs", () => {
    it("fetches all clubs", async () => {
      const clubs = await club.findApprovedClubs();

      for (let i = 0; i < clubs.length; i++) {
        expect(clubs[i].approval).equal("APPROVED");
      }
    });
  });
});
