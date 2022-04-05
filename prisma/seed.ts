const { CREATE_TAGS } = require("../lib/docs");
const { GET_TAGS } = require("../lib/docs");
const { REGISTER } = require("../lib/docs");
const { client } = require("../server/tests/requestClient");
const users = require("./data/users.json");
const clubs = require("./data/clubs.json");
const teachers = require("./data/teachers.json");
const inquirer = require("inquirer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

  return response;
};

const seed_students = async () => {
  const { getTags: tags } = await client.request(GET_TAGS);

  const formatted_users = users.map((user) => ({
    firstname: user.name,
    lastname: user.lastname,
    email: user.email,
    password: "Password123!",
    grade: "JUNIOR",
    interests: [
      { id: tags[Math.floor(Math.random() * tags.length)].id },
      { id: tags[Math.floor(Math.random() * tags.length)].id },
      { id: tags[Math.floor(Math.random() * tags.length)].id },
      { id: tags[Math.floor(Math.random() * tags.length)].id },
    ],
  }));

  formatted_users.map((user) => {
    const chars = "1234567890";
    let userId = "";
    for (let i = 7; i > 0; --i) {
      userId += chars[Math.floor(Math.random() * chars.length)];
    }
    user.studentId = userId;
  });

  for (let user of formatted_users) {
    await client.request(REGISTER, { data: user });
  }
};

const seed_teachers = async () => {
  const formatted_teachers = teachers.map((teacher) => ({
    firstname: teacher.firstname,
    lastname: teacher.lastname,
    email: teacher.email,
    password: "$2b$10$HihvZx6IXwiFCdveslht7O3AYaCH5esQ4Y7VjLTIbUyJjOyulNc8G",
    grade: "TEACHER",
    type: "TEACHER",
    emailVerified: true,
    active: true,
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
      userId += chars[Math.floor(Math.random() * chars.length)];
    }
    teacher.studentId = userId;
  });

  const response = await prisma.user.createMany({
    data: formatted_teachers,
  });

  return response;
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
            name: "president",
            color: "#C3F4E9",
            type: "LEADER",
            description: "president description",
            users: {
              connect: {
                id: presidentId,
              },
            },
          },
          {
            name: "vice president",
            color: "#FFEAB4",
            type: "LEADER",
            description: "vice president description",
            users: {
              connect: {
                id: vicePresidentId,
              },
            },
          },
          {
            name: "secretary",
            color: "#FFDCE5",
            type: "LEADER",
            description: "secretary description",
            users: {
              connect: {
                id: secretaryId,
              },
            },
          },
          {
            name: "treasurer",
            color: "#F3DCFE",
            type: "LEADER",
            description: "treasurer description",
            users: {
              connect: {
                id: treasurerId,
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
      teacher: {
        connect: {
          id: teacherUserIds[Math.floor(Math.random() * teacherUserIds.length)],
        },
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
      status: "",
      approval: false,
      availability: "",
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

    const statuses = ["DRAFT", "REVIEW", "APPROVED"];

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    let approval = null;

    if (status == "DRAFT" || status == "REVIEW") {
      approval = false;
    }

    if (status == "APPROVED") {
      approval = true;
    }

    const availabilities = ["OPEN", "INVITE_ONLY", "CLOSED"];
    const availability =
      availabilities[Math.floor(Math.random() * availabilities.length)];

    clubQuery.status = "APPROVED";
    clubQuery.approval = approval;
    clubQuery.availability = availability;

    await prisma.club.create({
      data: clubQuery,
    });
  }
};

export const main = async () => {
  await seed_tags();
  await seed_students();
  await seed_teachers();
  await seed_clubs();
  // const answer = await inquirer.prompt([
  //   {
  //     name: "seed_functions",
  //     message: "Select an option to seed: ",
  //     type: "list",
  //     choices: ["Tags", "Students", "Teachers", "Clubs", "All"],
  //   },
  // ]);

  // console.log(answer);

  // switch (answer.seed_functions) {
  //   case "Tags":
  //     console.log("Seeding Tags...");
  //     await seed_tags();
  //     break;

  //   case "Students":
  //     console.log("Seeding Students...");
  //     await seed_students();
  //     break;

  //   case "Teachers":
  //     console.log("Seeding Teachers...");
  //     await seed_teachers();
  //     break;

  //   case "Clubs":
  //     console.log("Seeding Clubs...");
  //     await seed_clubs();
  //     break;

  //   case "All":
  //     console.log("Seeding Everything...");
  //     await seed_tags();
  //     await seed_students();
  //     await seed_teachers();
  //     await seed_clubs();
  //     break;
  // }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
