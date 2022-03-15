import { User, Tag } from "@prisma/client";
import { expect } from "chai";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as auth from "./authUnitApi";
import { deleteUser } from "../../helpers";
import { validate } from "../../../utils/validation";
import { loginSchema } from "./../../../utils/validation/schemas/loginSchema";
import { newUserSchema } from "../../../utils/validation/schemas/newUserSchema";
import {
  LoginArgs,
  LoginPayload,
  RegisterArgs,
  RegisterPayload,
  FindUserBySessionArgs,
  FindUserBySessionPayload,
} from "../../../graphql/auth/types";

interface IUser extends Omit<User, "id" | "ccid" | "emailVerified" | "type"> {
  interests: Omit<Tag, "name">[];
}

describe("auth function unit tests", () => {
  const user: IUser = {
    firstname: "Paul",
    lastname: "Bokelman",
    email: "paul.bokelman1@gmail.com",
    password: "Password123!",
    grade: "Senior",
    interests: [{ id: 8 }, { id: 3 }],
  };

  describe("register unit tests", () => {
    afterAll(async () => {
      return await deleteUser({ email: user.email });
    });

    it("registers a new user", async () => {
      const { user: newUser, token } = await auth.register(user);

      for (const key of Object.keys(user)) {
        if (key === "password") {
          const isMatch = await bcrypt.compare(user.password, newUser[key]);
          expect(isMatch).equal(
            true,
            `hashed password and ${user.password} do not match`
          );
        } else if (key === "interests") {
          continue; // TODO: check interests
        } else {
          expect(newUser[key]).to.equal(
            user[key],
            `${key} does not match (got: ${newUser[key]} vs expected: ${user[key]})`
          );
        }
      }

      jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
        expect(err).to.be.null;
        ["id", "ccid", "email"].forEach((key) => {
          expect(decoded).to.have.property(
            key,
            newUser[key],
            `jwt ${key} does not match (got: ${decoded[key]} vs expected: ${newUser[key]})`
          );
        });
      });

      expect(newUser.id).to.a(
        "number",
        `expected ${newUser.id} to be a number but got ${typeof newUser.id}`
      );
    });

    it("should throw error if input has existing email", async () => {
      try {
        await auth.register(user);
      } catch (e) {
        expect(e.message).to.equal(
          "Email already exists",
          "expected error message to be 'Email already exists'"
        );
      }
    });

    it("should throw error if input is invalid", async () => {
      const invalidInputs: Record<keyof IUser, any>[] = [
        { ...user, firstname: "Paul3" }, // firstname is not alpha
        { ...user, lastname: "Boke1man" }, // lastname is not alpha
        { ...user, email: "paul.bokelman1@gmail" }, // invalid email
        { ...user, password: "Password" }, // password doesn't meet constraints
        { ...user, grade: "Janitor" }, // not valid grade
        { ...user, interests: [{ id: 8 }, { id: 3 }, { id: "a" }] }, // id can't be alpha
        { ...user, firstname: "" }, // required field
        { ...user, lastname: "" }, // required field
        { ...user, email: "" }, // required field
        { ...user, password: "" }, // required field
        { ...user, grade: "" }, // required field
      ];

      for (const invalidInput of invalidInputs) {
        const { valid, errors } = await validate({
          schema: newUserSchema as any,
          data: invalidInput,
        });
        try {
          await auth.register(invalidInput);
        } catch (e) {
          expect(e.message).to.equal(
            errors[0],
            `response message doesn't match (message: ${e.message}, expected: ${errors[0]})`
          );
        } finally {
          expect(valid).equal(
            false,
            `invalid input (${JSON.stringify(
              invalidInput
            )}); valid bool should be false`
          );
        }
      }
    });
  });

  describe("login unit tests", () => {
    const loginArgs: LoginArgs = (({ email, password }) => ({
      email,
      password,
      remember: true,
    }))(user);

    afterAll(async () => {
      return await deleteUser({ email: loginArgs.email });
    });

    it("should throw error if input is invalid", async () => {
      const invalidInputs: Record<keyof LoginArgs, any>[] = [
        { ...loginArgs, email: "paul.bokelman1gmail" }, // invalid email
        { ...loginArgs, password: "Pass" }, // password should be 8 chars
        { ...loginArgs, remember: 4 }, // remember should be boolean
        { ...loginArgs, email: "" }, // email is required
        { ...loginArgs, password: "" }, // password is required
        { ...loginArgs, remember: "" }, // remember is required
      ];

      for (const invalidInput of invalidInputs) {
        const { valid, errors } = await validate({
          schema: loginSchema as any,
          data: invalidInput,
        });
        try {
          await auth.login(invalidInput);
        } catch (e) {
          expect(e.message).to.equal(
            errors[0],
            `response message doesn't match (message: ${e.message}, expected: ${errors[0]})`
          );
        } finally {
          expect(valid).equal(
            false,
            `invalid input (${JSON.stringify(
              invalidInput
            )}); valid bool should be false`
          );
        }
      }
    });

    it("should throw error if user with email doesn't exist", async () => {
      try {
        await auth.login(loginArgs);
      } catch (e) {
        expect(e.message).to.equal(
          "A user with that email does not exist",
          "expected error message to be 'A user with that email does not exist'"
        );
      }
    });

    it("should throw error if password doesn't match user", async () => {
      await auth.register(user);
      try {
        await auth.login({ ...loginArgs, password: "Incorrect1234!" }); // Password123!
      } catch (e) {
        expect(e.message).to.equal(
          "Incorrect password!",
          "expected error message to be 'Incorrect password!'"
        );
      }
    });

    it("should login user", async () => {
      const { user, token } = await auth.login(loginArgs);
      for (const key of Object.keys(loginArgs)) {
        if (key === "password") {
          const isMatch = await bcrypt.compare(loginArgs.password, user[key]);
          expect(isMatch).equal(
            true,
            `hashed password and ${user.password} do not match`
          );
        } else if (key === "remember") {
          continue;
        } else {
          expect(user[key]).to.equal(
            loginArgs[key],
            `${key} does not match (got: ${user[key]} vs expected: ${loginArgs[key]})`
          );
        }
      }

      jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
        expect(err).equal(null, "jwt errors should be null");
        ["id", "ccid", "email"].forEach((key) => {
          expect(decoded).to.have.property(
            key,
            user[key],
            `jwt ${key} does not match (got: ${decoded[key]} vs expected: ${user[key]})`
          );
        });
      });

      expect(user.id).to.a(
        "number",
        `expected ${user.id} to be a number but got ${typeof user.id}`
      );
    });
  });
});
