import { Context } from "../../ctx";
import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type ValidateTeacherArgs = {
  ccid: User["ccid"];
};

export type ValidateTeacherPayload = Awaited<
  ReturnType<typeof validateTeacher>
>;

export const validateTeacher = async (
  _parent: any,
  { ccid }: ValidateTeacherArgs,
  { prisma }: Context
): Promise<typeof user> => {
  const user = await prisma.user.findUnique({
    where: {
      ccid: ccid,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      ccid: true,
      email: true,
      type: true,
      active: true,
    },
  });

  if (!user) throw new ApolloError("User not found", "NO_USER", { ccid });
  if (user.active === false)
    throw new ApolloError("Requested user is not active", "CONSTRAINT_FAILED", {
      ccid,
    });
  if (user.type !== "TEACHER")
    throw new ApolloError(
      "Requested user is not a teacher",
      "CONSTRAINT_FAILED",
      { ccid }
    );

  return user;
};
