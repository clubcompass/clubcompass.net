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

type CreateTeacher = Omit<
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
