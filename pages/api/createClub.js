import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createClub = async (req, res) => {
  let {
    name,
    email,
    meeting_time,
    meeting_location,
    description,
    link,
    link_name,
    tag_names,
    president_id,
  } = req.body;

  let tags = [];

  tag_names.map((tag_name) => {
    tags.push({
      tag: {
        connect: {
          name: tag_name,
        },
      },
    });
  });

  let resp = await prisma.club.create({
    data: {
      name: name,
      email: email,
      meeting_time: meeting_time,
      meeting_location: meeting_location,
      description: description,
      link: link,
      link_name: link_name,
      tags: {
        create: tags,
      },
    },
  });

  await prisma.user.update({
    where: {
      id: president_id,
    },
    data: {
      presidentOf: {
        connect: {
          id: resp.id,
        },
      },
    },
  });

  res.status(200).json({ response: resp });
};

export default createClub;
