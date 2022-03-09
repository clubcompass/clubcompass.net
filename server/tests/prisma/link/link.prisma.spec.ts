import { expect } from "chai";
import { link } from "./linkApi";

describe("links", () => {
  describe("findUniqueLink(...data)", () => {
    it("finds a unique link with given id", async () => {
      const uniqueLink = await link.findUniqueLink({ id: 2 });
      expect(uniqueLink.id).to.a("number");
    });
  });
});
