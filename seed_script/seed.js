const axios = require("axios");
const users = require("./users.json");
const clubs = require("./clubs.json");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { exit } = require("process");

const args = process.argv.slice(2);

const seed_tags = async () => {
  await axios.post(
    "http://localhost:3000/api/create/tags",
    {
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
    },
    {
      headers: {
        secret_key: "ain1voo5s0isek5mkorp",
      },
    }
  );
};

const seed_users = async () => {
  let formatted_user_list = [];

  const resp = await axios.get("http://localhost:3000/api/get/tags", {
    headers: {
      secret_key: "ain1voo5s0isek5mkorp",
    },
  });

  const tags = resp.data;

  users.map((user) => {
    formatted_user_list.push({
      id: user.cuid,
      firstname: user.name,
      lastname: user.lastname,
      email: user.email,
      grade: user.grade,
      password: "tae&&c9x56n@b&vr9gyp",
      emailVerified: true,
      tag_ids: [
        tags[Math.floor(Math.random() * tags.length)].id,
        tags[Math.floor(Math.random() * tags.length)].id,
        tags[Math.floor(Math.random() * tags.length)].id,
        tags[Math.floor(Math.random() * tags.length)].id,
      ],
    });
  });

  for (let i = 0; i < formatted_user_list.length; i++) {
    await axios.post(
      "http://localhost:3000/api/create/user",
      formatted_user_list[i],
      {
        headers: {
          secret_key: "ain1voo5s0isek5mkorp",
        },
      }
    );
  }
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

  for (let i = 0; i < clubs.length; i++) {
    await prisma.club.create({
      data: clubs[i],
    });
  }
};

const seed_club_members = async () => {
  const clubs = await prisma.club.findMany();
  const users = await prisma.user.findMany();
  const user_ids = Array.from([...users], (user) => {
    return user.id;
  });
  const formatted_clubs = Array.from([...clubs], (club) => {
    return { club_id: club.id };
  });

  formatted_clubs.map(async (club) => {
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

    club.members = members;
  });

  for (let i = 0; i < formatted_clubs.length; i++) {
    await prisma.club.update({
      where: {
        id: formatted_clubs[i].club_id,
      },
      data: {
        members: {
          connect: formatted_clubs[i].members,
        },
      },
    });
  }
};

const clear_database = async () => {
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.club.deleteMany();
};

const main = async () => {
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
      console.log("Seeding club members...");
      await seed_club_members();
      console.log("Done.");
      break;
    }
    case 5: {
      console.log("Clearing database...");
      await clear_database();
      console.log("Done.");
      break;
    }
    default: {
      console.log("Invalid option selected");
    }
  }

  process.exit();
};

main();
