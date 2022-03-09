import { expect } from "chai";
import { invite } from "./inviteApi";

describe("invites", () => {
  describe("findUniqueInvite(...data)", () => {
    it("finds a unique invite with given id", async () => {
      const uniqueInvite = await invite.findUniqueInvite({ id: 4 });
      expect(uniqueInvite.id).to.a("number");
    });
  });
});
