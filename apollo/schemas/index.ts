import { gql } from "apollo-server-micro";

import { userSchema } from "./userSchema";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const schemas = [linkSchema, userSchema];
