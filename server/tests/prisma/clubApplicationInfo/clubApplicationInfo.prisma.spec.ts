import { expect } from "chai";
import { clubApplicationInfo } from "./clubApplicationInfoApi";

describe("clubs", () => {
  describe("findUniqueClubApplicationInfo(...data)", () => {
    it("finds a unique club application info with given id", async () => {
      const uniqueClubApplicationInfo =
        await clubApplicationInfo.findUniqueClubApplicationInfo({ id: 4 });
      expect(uniqueClubApplicationInfo.id).to.a("number");
    });
  });
});
