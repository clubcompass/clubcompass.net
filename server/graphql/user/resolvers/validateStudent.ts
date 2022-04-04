import { Context } from "../../ctx";
import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type ValidateStudentArgs = {
  ccid: User["ccid"];
};

export type ValidateStudentPayload = Awaited<
  ReturnType<typeof validateStudent>
>;

export const validateStudent = async (
  _parent: any,
  { ccid }: ValidateStudentArgs,
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

  if (!user) throw new ApolloError("User does not found", "NO_USER", { ccid });
  if (user.active === false)
    throw new ApolloError("Requested user is not active", "CONSTRAINT_FAILED", {
      ccid,
    });
  if (user.type !== "STUDENT")
    throw new ApolloError(
      "Requested user is not a student",
      "CONSTRAINT_FAILED",
      {
        ccid,
      }
    );

  return user;
};
