const axios = require("axios");
const users = require("./users.json");
const clubs = require("./clubs.json");
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
  ];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    await prisma.tag.create({
      data: {
        name,
      },
    });
  }

  return;
};

const seed_users = async () => {
  let formatted_user_list = [];

  const resp = await axios.get("http://localhost:3000/api/tag/get");

  const tags = resp.data;

  users.map((user) => {
    let formatted_user = {
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      grade: user.grade,
      password: "$2b$10$HihvZx6IXwiFCdveslht7O3AYaCH5esQ4Y7VjLTIbUyJjOyulNc8G",
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
        description: "president description",
      },
      vicePresident: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
        description: "vice president description",
      },
      secretary: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
        description: "secretary description",
      },
      treasurer: {
        id: studentIds[Math.floor(Math.random() * studentIds.length)],
        color: "#75aff8",
        description: "treasurer description",
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
      projectedRevenue: [
        {
          name: "Revenue Source #1",
          amount: 51.21,
          date: "2/22/22",
        },
        {
          name: "Revenue Source #2",
          amount: 69.42,
          date: "2/23/22",
        },
      ],
      projectedExpenses: [
        {
          name: "Expense #1",
          amount: 51.21,
          date: "2/22/22",
        },
        {
          name: "Expense #2",
          amount: 69.42,
          date: "2/23/22",
        },
      ],
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
      approval = "UNAPPROVED";
    }

    if (status == "APPROVED") {
      approval = "APPROVED";
    }

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

const seed_invites = async () => {
  const clubs = await prisma.club.findMany();

  const students = await prisma.user.findMany({
    where: {
      type: "STUDENT",
    },
  });

  const studentIds = Array.from([...students], (user) => {
    return user.id;
  });

  for (let i = 0; i < clubs.length; i++) {
    await axios.post("http://localhost:3000/api/invite/create", {
      userId: studentIds[Math.floor(Math.random() * studentIds.length)],
      clubId: clubs[i].id,
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
      break;
    }
    case 4: {
      console.log("Seeding statuses...");
      await seed_statuses();
      console.log("Done.");
      break;
    }
    case 5: {
      console.log("Seeding links...");
      await seed_links();
      console.log("Done.");
      break;
    }
    case 6: {
      console.log("Seeding invites...");
      await seed_invites();
      console.log("Done.");
      break;
    }
  }

  process.exit();
};

main();
