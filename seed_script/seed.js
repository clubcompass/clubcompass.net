const axios = require("axios");
const users = require("./users.json");
const clubs = require("./clubs.json");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { exit } = require("process");

const seed_tags = async () => {
  await axios.post("http://localhost:3000/api/create/tags", {
    tag_names: [
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
  users.map(async (user) => {
    await axios.post("http://localhost:3000/api/create/user", {
      id: user.cuid,
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  });
};

const seed_clubs = async () => {
  const users = await prisma.user.findMany();
  const user_ids = Array.from([...users], (user) => {
    return user.id;
  });

  const tags = await prisma.tag.findMany();
  const tag_ids = Array.from([...tags], (tag) => {
    return tag.id;
  });

  clubs.map((club) => {
    (club.slug = club.name
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")),
      (club.membership_requirements = "must attend DNHS"),
      (club.duties_of_members = "attend meetings and build stuff"),
      (club.titles_and_duties_of_officers = "sodhfodajfoajofzsjf"),
      (club.selection_of_officers = "nepotism"),
      (club.officer_minimum_gpa = 3.8),
      (club.minimum_percent_of_members_for_meeting = 51),
      (club.minimum_percent_of_members_for_approving_decision = 51),
      (club.president_contact = "somepresidentemail@gmail.com"),
      (club.tags = {
        connect: [
          {
            id: tag_ids[Math.floor(Math.random() * tag_ids.length)],
          },
          {
            id: tag_ids[Math.floor(Math.random() * tag_ids.length)],
          },
          {
            id: tag_ids[Math.floor(Math.random() * tag_ids.length)],
          },
          {
            id: tag_ids[Math.floor(Math.random() * tag_ids.length)],
          },
        ],
      }),
      (club.president = {
        connect: {
          id: user_ids[Math.floor(Math.random() * user_ids.length)],
        },
      }),
      (club.vicePresident = {
        connect: {
          id: user_ids[Math.floor(Math.random() * user_ids.length)],
        },
      }),
      (club.secretary = {
        connect: {
          id: user_ids[Math.floor(Math.random() * user_ids.length)],
        },
      }),
      (club.treasurer = {
        connect: {
          id: user_ids[Math.floor(Math.random() * user_ids.length)],
        },
      });
  });

  clubs.map(async (club) => {
    await prisma.club.create({
      data: club,
    });
  });
};

const seed_club_members = async () => {
  const clubs = await prisma.club.findMany();
  const users = await prisma.user.findMany();
  const user_ids = Array.from([...users], (user) => {
    return user.id;
  });
  const club_ids = Array.from([...clubs], (club) => {
    return club.id;
  });

  club_ids.map(async (club_id) => {
    let members = [];
    for (let i = 0; i < 20; i++) {
      let id = user_ids[Math.floor(Math.random() * user_ids.length)];
      if (members.includes({ id: id })) {
        while (members.includes({ id: id }) === true) {
          id = user_ids[Math.floor(Math.random() * user_ids.length)];
        }

        members.push({ id: id });
      } else {
        members.push({ id: id });
      }
    }

    await prisma.club.update({
      where: {
        id: club_id,
      },
      data: {
        members: {
          connect: members,
        },
      },
    });
  });
};

const clear_database = async () => {
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.club.deleteMany();
};

const main = async () => {
  // await seed_tags();
  // await seed_users();
  // await seed_clubs();
  // await seed_club_members();
};

main();
