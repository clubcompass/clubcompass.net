import { expect } from "chai";
import * as invites from "./inviteUnitApi";
describe("invites", () => {
  const inviteKeys = [
    "id",
    "status",
    { club: ["id", "name", "description", "status"] },
  ];
  describe("getUserInvites", () => {
    it("gets user invites (pending, accepted, declined)", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxLCJjY2lkIjoiUENTUkdaIiwiZW1haWwiOiJwYXVsLmJva2VsbWFuMUBnbWFpbC5jb20iLCJpYXQiOjE2NDcwNTAzNTUsImV4cCI6MTY0NzMwOTU1NX0.ukT4p3LZcD8zaDvQenQQUz0-nyVY428U2vTiRlVEChw";
      const userInvites = await invites.getUserInvites({ token });

      Object.keys(userInvites).map((inviteStatus: string, _) => {
        userInvites[inviteStatus as keyof typeof userInvites].forEach(
          (invite) => {
            console.log(invite);
            expect(invite).to.have.all.keys(inviteKeys);
          }
        );
      });

      expect(true).to.equal(true);
    });
  });
});
