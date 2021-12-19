import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const club = async (req, res) => {
  const {
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

  const tags = Array.from([...tag_names], (tag) => {
    return {
      tag: {
        connect: {
          name: tag,
        },
      },
    };
  });

  const response = await prisma.club.create({
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
          id: response.id,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default club;
