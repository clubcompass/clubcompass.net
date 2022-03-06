import { gql } from "apollo-server-micro";
import { clubSchema } from "./clubSchema";
import { userSchema } from "./userSchema";
import { tagSchema } from "./tagSchema";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const schemas = [linkSchema, userSchema, clubSchema, tagSchema];
