import { expect } from "chai";
import { club } from "./clubApi";

describe("clubs", () => {
  describe("findUniqueClub(...data)", () => {
    it("finds a unique club with given id", async () => {
      const uniqueClub = await club.findUniqueClub({ id: 7 });
      expect(uniqueClub.id).to.a("number");
    });
  });
});
