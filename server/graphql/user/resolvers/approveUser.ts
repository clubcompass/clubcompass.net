import { Context } from "../../ctx";
import { User } from "@prisma/client";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { validate } from "../../../utils/validation";
import { approveUserSchema } from "../../../utils/validation/schemas/user";

export type ApproveUserArgs = {
  userId: User["id"];
};

export type ApproveUserPayload = Awaited<ReturnType<typeof approveUser>>;

export const approveUser = async (
  _parent: any,
  { userId }: ApproveUserArgs,
  { prisma }: Context
): Promise<typeof user> => {
  const { valid, errors } = await validate({
    schema: approveUserSchema as any,
    data: { userId },
  });

  console.log(valid);
  console.log(errors);

  if (!valid) throw new UserInputError("Invalid userId input", { errors });

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      active: true,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      active: true,
    },
  });

  if (!user) throw new ApolloError("Club was not found", "NO_CLUB", { userId });

  return user;
};
