import { createTags } from "./tag";

export const tagResolvers = {
  Query: {},
  Mutation: { createTags },
};
