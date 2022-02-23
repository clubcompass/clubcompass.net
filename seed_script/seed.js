const axios = require("axios");
const users = require("./users.json");
const clubs = require("./clubs.json");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed_tags = async () => {
  await axios.post("http://localhost:3000/api/tag/create", {
    names: [
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
      "academic competition",
      "tutoring",
      "culture",
      "socializing",
      "debate",
      "business",
      "community",
      "education",
      "public speaking",
      "social activism",
    ],
  });
};

const seed_users = async () => {
  let formatted_user_list = [];

  const resp = await axios.get("http://localhost:3000/api/tag/get");

  const tags = resp.data;

  // console.log(resp);

  users.map((user) => {
    let formatted_user = {
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      grade: user.grade,
      password: "tae&&c9x56n@b&vr9gyp",
      emailVerified: true,
      tagIds: [
        tags[Math.floor(Math.random() * tags.length)].id,
        tags[Math.floor(Math.random() * tags.length)].id,
        tags[Math.floor(Math.random() * tags.length)].id,
        tags[Math.floor(Math.random() * tags.length)].id,
      ],
    };

    if (Math.floor(Math.random() * 10) === 7) {
      formatted_user.type = "TEACHER";
    }

    formatted_user_list.push(formatted_user);
  });

  for (let i = 0; i < formatted_user_list.length; i++) {
    await axios.post(
      "http://localhost:3000/api/user/create",
      formatted_user_list[i]
    );
  }
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

  const tags = (await axios.get("http://localhost:3000/api/tag/get")).data;

  const studentIds = Array.from([...students], (user) => {
    return user.id;
  });

  const teacherIds = Array.from([...teachers], (user) => {
    return user.id;
  });

  const tag_ids = Array.from([...tags], (tag) => {
    return tag.id;
  });

  // console.log(tagIds);

  let formatted_clubs = [];

  clubs.map((club) => {
    const data = {
      name: club.name,
      email: club.email,
      description: club.description,
      meetingDate: club.meetingTime,
      location: club.location,
      president: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
      },
      vicePresident: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
      },
      secretary: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
      },
      treasurer: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
      },
      memberIds: [
        studentIds[Math.floor(Math.random() * studentIds.length)],
        studentIds[Math.floor(Math.random() * studentIds.length)],
        studentIds[Math.floor(Math.random() * studentIds.length)],
        studentIds[Math.floor(Math.random() * studentIds.length)],
        studentIds[Math.floor(Math.random() * studentIds.length)],
      ],
      tagIds: [
        tag_ids[Math.floor(Math.random() * tag_ids.length)],
        tag_ids[Math.floor(Math.random() * tag_ids.length)],
        tag_ids[Math.floor(Math.random() * tag_ids.length)],
        tag_ids[Math.floor(Math.random() * tag_ids.length)],
      ],
      teacherId: teacherIds[Math.floor(Math.random() * teacherIds.length)],
      purpose: "purpose of the club",
      membershipRequirements: "must be in good standing",
      dutiesOfMembers: "attend meetings and participate in club events",
      titlesAndDutiesOfOfficers: "idek what this is",
      selectionOfOfficers: "nepotism",
      officerMinimumGPA: 3.2,
      percentAttendanceForOfficialMeeting: 40,
      percentAttendanceToApproveDecision: 51,
    };

    formatted_clubs.push(data);
  });

  for (let i = 0; i < formatted_clubs.length; i++) {
    await axios.post(
      "http://localhost:3000/api/club/create",
      formatted_clubs[i]
    );
  }
};

const seed_statuses = async () => {
  const clubs = await prisma.club.findMany();

  const statuses = ["DRAFT", "REVIEW", "APPROVED"];

  for (let i = 0; i < clubs.length; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    let approval = null;

    if (status == "DRAFT" || status == "REVIEW") {
      console.log("hello");
      approval = "UNAPPROVED";
    }

    if (status == "APPROVED") {
      approval = "APPROVED";
    }

    console.log(status);
    console.log(approval);

    await prisma.club.update({
      where: {
        id: clubs[i].id,
      },
      data: {
        approval: approval,
        status: status,
      },
    });
  }
};

const seed_links = async () => {
  const clubs = await prisma.club.findMany();

  for (let i = 0; i < clubs.length; i++) {
    await axios.post("http://localhost:3000/api/club/links/add", {
      id: clubs[i].id,
      name: "Instagram",
      link: "https://www.instagram.com",
      type: "INSTAGRAM",
    });

    await axios.post("http://localhost:3000/api/club/links/add", {
      id: clubs[i].id,
      name: "Discord",
      link: "https://www.discord.com",
      type: "DISCORD",
    });
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  const OPTION = parseInt(args);

  switch (OPTION) {
    case 1: {
      console.log("Seeding tags...");
      await seed_tags();
      console.log("Done.");
      break;
    }
    case 2: {
      console.log("Seeding users...");
      await seed_users();
      console.log("Done.");
      break;
    }
    case 3: {
      console.log("Seeding clubs...");
      await seed_clubs();
      console.log("Done.");
    }
    case 4: {
      console.log("Seeding statuses...");
      await seed_statuses();
      console.log("Done.");
    }
    case 5: {
      console.log("Seeding links...");
      await seed_links();
      console.log("Done.");
    }
  }

  process.exit();
};

main();
