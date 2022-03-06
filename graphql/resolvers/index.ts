import { resolvers as prismaResolvers } from "@generated/type-graphql";
import { userResolvers } from "./userResolvers";
import { clubResolvers } from "./clubResolvers";
import { tagResolvers } from "./tagResolvers";

export const resolvers = [
  userResolvers,
  prismaResolvers,
  clubResolvers,
  tagResolvers,
];
