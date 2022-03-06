import { request } from "graphql-request";
import { Prisma } from "@prisma/client";
import { createUserDocument } from "./gql";
// import dotenv from "dotenv";
// dotenv.config();

// const url = process.env.SERVER_URL as string;
const url = "http://localhost:3000/api/graphql";

// Mutations

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  password: string;
  grade: string;
  type: string;
  interests: Prisma.TagWhereUniqueInput[];
};

export const create = async ({
  firstname,
  lastname,
  email,
  emailVerified,
  password,
  grade,
  type,
  interests,
}: User) => {
  const response = await request(url, createUserDocument, {
    firstname,
    lastname,
    email,
    emailVerified,
    password,
    grade,
    type,
    interests,
  });
  return response;
};

export const user = {
  create,
};
