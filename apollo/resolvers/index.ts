import { resolvers as prismaResolvers } from "@generated/type-graphql";
import { userResolvers } from "./userResolvers";
import { clubResolvers } from "./clubResolvers";

export const resolvers = [prismaResolvers, userResolvers, clubResolvers];
