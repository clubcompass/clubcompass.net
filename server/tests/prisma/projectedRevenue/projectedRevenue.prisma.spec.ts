import { expect } from "chai";
import { projectedRevenue } from "./projectedRevenueApi";

describe("projectedRevenue", () => {
  describe("findUniqueProjectedRevenue(...data)", () => {
    it("finds a unique projectedRevenue with given id", async () => {
      const uniqueProjectedRevenue =
        await projectedRevenue.findUniqueProjectedRevenue({ id: 4 });
      expect(uniqueProjectedRevenue.id).to.a("number");
    });
  });
});
