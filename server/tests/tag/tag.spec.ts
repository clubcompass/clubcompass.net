import { expect } from "chai";
import { tag } from "./tagApi";

describe("tags", () => {
  describe("findUniqueTag(...data)", () => {
    it("finds a unique tag with given id", async () => {
      const uniqueTag = await tag.findUniqueTag({ id: 4 });
      expect(uniqueTag.id).to.a("number");
    });
  });
});
