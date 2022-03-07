import { gql } from "apollo-server-micro";
// import userSchema from "./userSchema.gql";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [linkSchema];
