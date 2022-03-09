import { expect } from "chai";
import { user } from "./userApi";

describe("users", () => {
  describe("findUniqueUser(...data)", () => {
    it("finds a unique user with given id", async () => {
      const uniqueUser = await user.findUniqueUser({ id: 4 });
      expect(uniqueUser.id).to.a("number");
      expect(uniqueUser.ccid).to.have.lengthOf(6);
      expect(/([A-Z])\w+/.test(uniqueUser.ccid), "ccid generated correctly").to
        .be.true;
      expect(uniqueUser).have.to.have.keys(
        "id",
        "ccid",
        "firstname",
        "lastname",
        "email",
        "emailVerified",
        "password",
        "grade",
        "type"
      );
    });
  });
});
