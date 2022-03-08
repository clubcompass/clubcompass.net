import ProjectedExpenses from "./projectedExpenses/resolvers";
import ProjectedRevenue from "./projectedRevenue/resolvers";
import Role from "./role/resolvers";
import Invite from "./invite/resolvers";
import User from "./user/resolvers";
import Tag from "./tag/resolvers";
import ClubApplicationInfo from "./clubApplicationInfo/resolvers";
import Link from "./link/resolvers";
import Club from "./club/resolvers";
export const resolvers = [
  Club,
  Link,
  ClubApplicationInfo,
  Tag,
  User,
  Invite,
  Role,
  ProjectedRevenue,
  ProjectedExpenses,
];
