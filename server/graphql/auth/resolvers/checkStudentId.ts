import { AuthenticationError, UserInputError } from "apollo-server-micro";
import type { User } from "@prisma/client";
import { Context } from "../../ctx";
import { validate } from "../../../utils/validation";
import { newUserSchema } from "../../../utils/validation/schemas";
export type CheckStudentIdArgs = {
  studentId: User["studentId"];
};

export type CheckStudentIdPayload = Awaited<ReturnType<typeof checkStudentId>>;

export const checkStudentId = async (
  _parent: any,
  { studentId }: CheckStudentIdArgs,
  { prisma }: Context
): Promise<boolean> => {
  console.log(studentId);
  const { valid, errors } = await validate({
    schema: newUserSchema.fields.studentId as any,
    data: studentId,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const user = await prisma.user.findUnique({
    where: {
      studentId,
    },
  });

  if (user) throw new AuthenticationError("A user with that Student Id exists");
  return true;
};
