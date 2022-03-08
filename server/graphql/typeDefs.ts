import ProjectedExpenses from "./projectedExpenses/typeDefs";
import ProjectedRevenue from "./projectedRevenue/typeDefs";
import Role from "./role/typeDefs";
import Invite from "./invite/typeDefs";
import User from "./user/typeDefs";
import Tag from "./tag/typeDefs";
import ClubApplicationInfo from "./clubApplicationInfo/typeDefs";
import Link from "./link/typeDefs";
import Club from "./club/typeDefs";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { sdlInputs } from "@paljs/plugins";

export const typeDefs = mergeTypeDefs([
  sdlInputs(),
  Club,
  Link,
  ClubApplicationInfo,
  Tag,
  User,
  Invite,
  Role,
  ProjectedRevenue,
  ProjectedExpenses,
]);
