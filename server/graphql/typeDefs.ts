import Role from "./role/typeDefs";
import Invite from "./invite/typeDefs";
import User from "./user/typeDefs";
import Tag from "./tag/typeDefs";
import Link from "./link/typeDefs";
import Club from "./club/typeDefs";
import Auth from "./auth/typeDefs";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { sdlInputs } from "@paljs/plugins";

export const typeDefs = mergeTypeDefs([
  sdlInputs(),
  Club,
  Link,
  Tag,
  User,
  Invite,
  Role,
  Auth,
]);
