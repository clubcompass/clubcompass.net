import { expect } from "chai";
import { user, User } from "./userApi";
const data: User = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  emailVerified: true,
  password: "password",
  grade: "Freshman",
  type: "STUDENT",
  interests: [{ id: 5 }, { id: 6 }],
};

describe("users", () => {
  describe("createUser(...data)", () => {
    it("creates a new user", async () => {
      const newUser: { createCustomUser: { id: number } } = await user.create(
        data
      );
      expect(newUser.createCustomUser.id).to.a("number");

      //   describe("deleteUser($id: Int!) {deleteUser(where: {id: $id})}", () => {
      //     it(`removes user with id ${user.id}`, async () => {
      //       const expectedResult = {
      //         data: {
      //           user: {
      //             id: "1",
      //             username: "rwieruch",
      //             email: "hello@robin.com",
      //             role: "ADMIN",
      //           },
      //         },
      //       };

      //       const result = await user.create(data);

      //       expect(result.data).to.eql(expectedResult);
      //     });
      //   });
    });
  });
});
