import { Resolvers } from "../types/resolversTypes";
import { addLink } from "./resolvers/addLink";
import { deleteLink } from "././resolvers/deleteLink";

const resolvers: Resolvers = {
  Mutation: {
    addLink,
    deleteLink,
  },
};

export default resolvers;
