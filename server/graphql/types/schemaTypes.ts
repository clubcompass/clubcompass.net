import * as Client from "@prisma/client";

export interface Club extends Client.Club {
  links?: Link[];
  applicationInfo?: ClubApplicationInfo;
  tags?: Tag[];
  members?: User[];
  editors?: User[];
  roles?: Role[];
  invites?: Invite[];
}

export interface Link extends Client.Link {
  club: Club;
}

export interface ClubApplicationInfo extends Client.ClubApplicationInfo {
  projectedRevenue?: ProjectedRevenue[];
  projectedExpenses?: ProjectedExpenses[];
}

export interface Tag extends Client.Tag {
  clubs?: Club[];
  interestedUsers?: User[];
}

export interface User extends Client.User {
  interests?: Tag[];
  clubs?: Club[];
  canEdit?: Club[];
  advisor?: ClubApplicationInfo[];
  roles?: Role[];
  invites?: Invite[];
}

export interface Invite extends Client.Invite {
  club: Club;
}

export interface Role extends Client.Role {
  users?: User[];
  club: Club;
}

export interface ProjectedRevenue extends Client.ProjectedRevenue {
  club?: ClubApplicationInfo;
}

export interface ProjectedExpenses extends Client.ProjectedExpenses {
  club?: ClubApplicationInfo;
}
