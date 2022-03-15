import { Resolvers } from "../types/resolversTypes";
import { joinClub } from "./resolvers/joinClub";
import { leaveClub } from "./resolvers/leaveClub";
import { deleteClub } from "./resolvers/deleteClub";
import { createClub } from "./resolvers/createClub";
import { editClub } from "./resolvers/editClub";
import { getClub } from "./resolvers/getClub";
import { getClubs } from "./resolvers/getClubs";

const resolvers: Resolvers = {
  Query: {
    getClub,
    getClubs,
  },
  Mutation: {
    joinClub,
    leaveClub,
    deleteClub,
    createClub,
    editClub,
  },
};
export default resolvers;
