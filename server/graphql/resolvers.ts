import Auth from "./auth/resolvers";
import Club from "./club/resolvers";
import Tag from "./tag/resolvers";
import User from "./user/resolvers";
import Invite from "./invite/resolvers";
import Link from "./link/resolvers";
// import Link from "./link/resolvers";
// import ClubApplicationInfo from "./clubApplicationInfo/resolvers";
// import Role from "./role/resolvers";
// import ProjectedRevenue from "./projectedRevenue/resolvers";
// import ProjectedExpenses from "./projectedExpenses/resolvers";
export const resolvers = [
  Auth,
  Club,
  Tag,
  User,
  Invite,
  Link,
  // Link,
  // ClubApplicationInfo,
  // Role,
  // ProjectedRevenue,
  // ProjectedExpenses,
];
