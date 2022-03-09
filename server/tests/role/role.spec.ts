import { expect } from "chai";
import { role } from "./roleApi";

describe("roles", () => {
  describe("findUniqueRole(...data)", () => {
    it("finds a unique role with given id", async () => {
      const uniqueRole = await role.findUniqueRole({ id: 8 });
      expect(uniqueRole.id).to.a("number");
    });
  });
});
