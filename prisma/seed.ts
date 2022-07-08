import { CREATE_TAGS } from "../lib/docs";
import { GET_TAGS } from "../lib/docs";
import { REGISTER } from "../lib/docs";
import { client } from "../server/tests/requestClient";
import users from "./data/users.json";
import clubs from "./data/clubs.json";
import teachers from "./data/teachers.json";
import { Grade, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

type CreateUser = Omit<
  User,
  "id" | "verificationToken" | "createdAt" | "updatedAt"
>;

const seed_tags = async () => {
  const names = [
    "volunteering",
    "charity",
    "science",
    "tech",
    "math",
    "engineering",
    "writing",
    "sports",
    "health",
    "politics",
    "music",
    "arts",
    "performing arts",
    "competition",
    "tutoring",
    "culture",
    "socializing",
    "debate",
    "business",
    "community",
    "education",
    "public speaking",
    "social activism",
  ];

  const { createTags: response } = await client.request(CREATE_TAGS, { names });

  console.log("🌱 Created tags 🏷");

  return response;
};

const seed_students = async () => {
  const formatted_users: CreateUser[] = users.map((user) => ({
    firstname: user.name,
    lastname: user.lastname,
    email: user.email,
    password: "$2b$10$HihvZx6IXwiFCdveslht7O3AYaCH5esQ4Y7VjLTIbUyJjOyulNc8G",
    grade: "JUNIOR",
    emailVerified: true,
    active: true,
    type: "STUDENT",
    ccid: "",
    studentId: "",
  }));

  formatted_users.map((user) => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    let ccid = "";
    for (let i = 6; i > 0; --i) {
      ccid += chars[Math.floor(Math.random() * chars.length)];
    }

    user.ccid = ccid;

    const charsStudentId = "1234567890";
    let userId = "";
    for (let i = 7; i > 0; --i) {
      userId +=
        charsStudentId[Math.floor(Math.random() * charsStudentId.length)];
    }
    user.studentId = userId;
  });

  const response = await prisma.user.createMany({
    data: formatted_users,
  });

  console.log("🌱 Created students 👶");

  return response;
};

const seed_teachers = async () => {
  const formatted_teachers: CreateUser[] = teachers.map((teacher) => ({
    firstname: teacher.firstname,
    lastname: teacher.lastname,
    email: teacher.email,
    password: "$2b$10$HihvZx6IXwiFCdveslht7O3AYaCH5esQ4Y7VjLTIbUyJjOyulNc8G",
    grade: "TEACHER",
    type: "TEACHER",
    emailVerified: true,
    active: true,
    ccid: "",
    studentId: "",
  }));

  formatted_teachers.map((teacher) => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    let ccid = "";
    for (let i = 6; i > 0; --i) {
      ccid += chars[Math.floor(Math.random() * chars.length)];
    }

    teacher.ccid = ccid;

    const charsStudentId = "1234567890";
    let userId = "";
    for (let i = 7; i > 0; --i) {
      userId +=
        charsStudentId[Math.floor(Math.random() * charsStudentId.length)];
    }
    teacher.studentId = userId;
  });

  const response = await prisma.user.createMany({
    data: formatted_teachers,
  });

  console.log("🌱 Created teachers 👨‍🏫");

  return response;
};

const seed_interests = async () => {
  const users = await prisma.user.findMany();

  users.map(async (user) => {
    const { getTags: tags } = await client.request(GET_TAGS);

    if (user.type === "STUDENT") {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          interests: {
            connect: [
              { id: tags[Math.floor(Math.random() * tags.length)].id },
              { id: tags[Math.floor(Math.random() * tags.length)].id },
              { id: tags[Math.floor(Math.random() * tags.length)].id },
              { id: tags[Math.floor(Math.random() * tags.length)].id },
            ],
          },
        },
      });
    }
  });

  console.log("🌱 Applied interests 💡");
};

const seed_clubs = async () => {
  const students = await prisma.user.findMany({
    where: {
      type: "STUDENT",
    },
  });

  const teachers = await prisma.user.findMany({
    where: {
      type: "TEACHER",
    },
  });

  const { getTags: tags } = await client.request(GET_TAGS);

  const studentUserIds = students.map((student) => student.id);

  const teacherUserIds = teachers.map((teacher) => teacher.id);

  for (let club of clubs) {
    const presidentId =
      studentUserIds[Math.floor(Math.random() * studentUserIds.length)];
    const vicePresidentId =
      studentUserIds[Math.floor(Math.random() * studentUserIds.length)];
    const secretaryId =
      studentUserIds[Math.floor(Math.random() * studentUserIds.length)];
    const treasurerId =
      studentUserIds[Math.floor(Math.random() * studentUserIds.length)];

    let clubQuery = {
      name: club.name,
      slug: club.name
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""),
      email: club.email,
      description: club.description,
      meetingDate: club.meetingTime,
      location: club.location,
      roles: {
        create: [
          {
            name: "President",
            color: "#C3F4E9",
            type: "PRESIDENT",
            description:
              "The president is the leader of the club. The president presides over and conducts meetings according to parliamentary procedures. The president is also responsible for developing agendas, scheduling fundraisers, creating a budget, and working with the club's advisor. The club president must also attend or designate someone to attend the mandatory Inter-Club Meetings and report back to club members.",
            permanent: true,
            rank: 2,
            permissions: {
              create: {
                canManageClubPage: true,
                canManageInvites: true,
                canManageMembers: true,
              },
            },
            users: {
              connect: {
                id: presidentId,
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
              },
            },
            users: {
              connect: {
                id: vicePresidentId,
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
              },
            },
            users: {
              connect: {
                id: secretaryId,
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
              },
            },
            users: {
              connect: {
                id: treasurerId,
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
              },
            },
            users: {
              connect: {
                id: teacherUserIds[
                  Math.floor(Math.random() * teacherUserIds.length)
                ],
              },
            },
          },
        ],
      },
      members: {
        connect: [
          {
            id: presidentId,
          },
          {
            id: vicePresidentId,
          },
          {
            id: secretaryId,
          },
          {
            id: treasurerId,
          },
        ],
      },
      tags: {
        connect: [
          { id: tags[Math.floor(Math.random() * tags.length)].id },
          { id: tags[Math.floor(Math.random() * tags.length)].id },
          { id: tags[Math.floor(Math.random() * tags.length)].id },
          { id: tags[Math.floor(Math.random() * tags.length)].id },
        ],
      },
      links: {
        create: [
          {
            name: "Instagram",
            link: "https://www.instagram.com",
            type: "INSTAGRAM",
          },
          {
            name: "Discord",
            link: "https://www.discord.com",
            type: "DISCORD",
          },
        ],
      },
      status: "APPROVED",
      approval: true,
      availability: "OPEN",
      editors: {
        connect: [
          { id: presidentId },
          { id: vicePresidentId },
          { id: secretaryId },
        ],
      },
      invites: {
        create: [
          {
            user: {
              connect: {
                id: studentUserIds[
                  Math.floor(Math.random() * studentUserIds.length)
                ],
              },
            },
          },
          {
            user: {
              connect: {
                id: studentUserIds[
                  Math.floor(Math.random() * studentUserIds.length)
                ],
              },
            },
          },
          {
            user: {
              connect: {
                id: studentUserIds[
                  Math.floor(Math.random() * studentUserIds.length)
                ],
              },
            },
          },
          {
            user: {
              connect: {
                id: studentUserIds[
                  Math.floor(Math.random() * studentUserIds.length)
                ],
              },
            },
          },
          {
            user: {
              connect: {
                id: studentUserIds[
                  Math.floor(Math.random() * studentUserIds.length)
                ],
              },
            },
          },
        ],
      },
    };

    await prisma.club.create({
      data: clubQuery,
    });
  }
};

const main = async () => {
  if (process.argv.includes("slim")) {
    await seed_tags();
    await seed_students();
    await seed_teachers();
    await seed_interests();
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
