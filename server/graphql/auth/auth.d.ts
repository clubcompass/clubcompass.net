import { User } from "@prisma/client";
import { TagWhereUniqueInput } from "../resolversTypes";

export interface AuthPayload {
  user: User;
  token: string;
}

type RegisterArgs = Pick<
  User,
  "firstname" | "lastname" | "email" | "password" | "grade"
> & { interests: TagWhereUniqueInput };

type LoginArgs = Pick<User, "email" | "password"> & { remember: boolean };
