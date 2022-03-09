import { expect } from "chai";
import { projectedExpenses } from "./projectedExpensesApi";

describe("projectedExpenses", () => {
  describe("findUniqueProjectedExpenses(...data)", () => {
    it("finds a unique projectedExpenses with given id", async () => {
      const uniqueProjectedExpenses =
        await projectedExpenses.findUniqueProjectedExpenses({ id: 4 });
      expect(uniqueProjectedExpenses.id).to.a("number");
    });
  });
});
