import { AuthenticationError, UserInputError } from "apollo-server-micro";
import type { User } from "@prisma/client";
import { Context } from "../../ctx";
import { validate } from "../../../utils/validation";
import { newUserSchema } from "../../../utils/validation/schemas";
export type CheckEmailArgs = {
  email: User["email"];
};

export type CheckEmailPayload = Awaited<ReturnType<typeof checkEmail>>;

export const checkEmail = async (
  _parent: any,
  { email }: CheckEmailArgs,
  { prisma }: Context
): Promise<boolean> => {
  console.log(email);
  const { valid, errors } = await validate({
    schema: newUserSchema.fields.email as any,
    data: email,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user)
    throw new AuthenticationError("A user with that email already exists");
  return true;
};
