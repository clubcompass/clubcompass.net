import { ApolloError, UserInputError } from "apollo-server-micro";
import type { Role, Tag, User, Club } from "@prisma/client";
import { Context } from "../../ctx";
import { generateSlug } from "../../../utils/generateSlug";
import { validate } from "../../../utils/validation";
import { createClubSchema } from "../../../utils/validation/schemas/club";

export interface CreateClubData
  extends Partial<Omit<Club, "id" | "slug" | "teacherId">> {
  tags?: Tag[];
}

export interface CreateClubArgs {
  data: CreateClubData;
}

export type CreateClubPayload = Awaited<ReturnType<typeof createClub>>;

interface UserRoles
  extends Pick<
    Role,
    "name" | "color" | "type" | "description" | "permanent" | "rank"
  > {
  users?: { connect: { id: User["id"] } };
  permissions: {
    create: {
      canManageClubPage: boolean;
      canManageInvites: boolean;
      canManageMembers: boolean;
      canManageMeetings: boolean;
    };
  };
}

export const createClub = async (
  _parent: any,
  { data }: CreateClubArgs,
  { prisma, auth: president }: Context
): Promise<typeof club> => {
  const { valid, errors } = await validate({
    schema: createClubSchema,
    data,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const nameExists = await prisma.club.findUnique({
    where: { name: data?.name },
    select: {
      name: true,
    },
  });

  if (nameExists) {
    throw new ApolloError("Club name already exists", "UNAUTHORIZED_ACTION", {
      path: "name",
      name: data?.name,
    });
  }

  const roles: UserRoles[] = [
    {
      name: "President",
      color: "#C3F4E9",
      type: "PRESIDENT",
      description:
        "The president is the leader of the club. The president presides over and conducts meetings according to parliamentary procedures. The president is also responsible for developing agendas, scheduling fundraisers, creating a budget, and working with the club's advisor. The club president must also attend or designate someone to attend the mandatory Inter-Club Meetings and report back to club members.",
      users: { connect: { id: president.id } },
      permanent: true,
      rank: 2,
      permissions: {
        create: {
          canManageClubPage: true,
          canManageInvites: true,
          canManageMembers: true,
          canManageMeetings: true,
        },
      },
    },
    {
      name: "Vice President",
      color: "#FFEAB4",
      type: "LEADER",
      description:
        "The Vice President assists the president in carrying out his/her duties. In the absence of the president, the Vice President presides at club meetings and carries out all additional responsibilities normally done by the president. The most important role of the Vice President is to oversee all committee work.",
      permanent: true,
      rank: 1,
      permissions: {
        create: {
          canManageClubPage: true,
          canManageInvites: true,
          canManageMembers: true,
          canManageMeetings: true,
        },
      },
    },
    {
      name: "Secretary",
      color: "#FFDCE5",
      type: "LEADER",
      description:
        "The Secretary must take accurate notes at all meetings and prepare minutes. In addition, the Secretary prepares correspondence on behalf of the club. The Secretary assists the President in keeping permanent records for the club and copies of all minutes and committees reports. The secretary maintains a copy of the club constitution and the club handbook for reference when needed.",
      permanent: true,
      rank: 1,
      permissions: {
        create: {
          canManageClubPage: true,
          canManageInvites: true,
          canManageMembers: true,
          canManageMeetings: true,
        },
      },
    },
    {
      name: "Treasurer",
      color: "#F3DCFE",
      type: "LEADER",
      description:
        "The club treasurer is responsible for maintaining accurate financial records for all expenditures. The treasurer reports all money spent and collected and of the account balance.",
      permanent: true,
      rank: 1,
      permissions: {
        create: {
          canManageClubPage: false,
          canManageInvites: false,
          canManageMembers: false,
          canManageMeetings: false,
        },
      },
    },
    {
      name: "Teacher",
      color: "#D5FECB",
      type: "ADVISOR",
      description:
        "The club advisor is responsible for advising the club on matters of interest to the club.",
      permanent: true,
      rank: 3,
      permissions: {
        create: {
          canManageClubPage: false,
          canManageInvites: false,
          canManageMembers: false,
          canManageMeetings: false,
        },
      },
    },
  ];

  const club = await prisma.club.create({
    data: {
      name: data?.name,
      slug: generateSlug(data?.name),
      ...data,
      roles: {
        create: roles,
      },
      members: {
        connect: {
          id: president.id,
        },
      },
      tags: {
        connect: data.tags,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      email: true,
      meetingDate: true,
      location: true,
      availability: true,
      tags: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
      status: true,
      approval: true,
    },
  });

  return club;
};
