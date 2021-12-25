import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const club = async (req, res) => {
  const {
    name,
    slug,
    email,
    teacher,
    meeting_time,
    meeting_location,
    description,
    link,
    link_name,
    image_link,
    image_caption,
    tag_ids,
    president_id,
  } = req.body;

  const tags = Array.from([...tag_ids], (tag_id) => {
    return {
      tag: {
        connect: {
          id: tag_id,
        },
      },
    };
  });

  let data = {
    name: name,
    slug: slug,
    email: email,
    teacher: teacher,
    meeting_time: meeting_time,
    meeting_location: meeting_location,
    description: description,
    tags: {
      create: tags,
    },
  };

  if (link !== undefined) {
    data.link = link;
    data.link_name = link_name;
  }

  if (image_link !== undefined) {
    data.image_link = image_link;
    data.image_caption = image_caption;
  }

  const response = await prisma.club.create({
    data: data,
    include: {
      tags: {
        select: {
          tag: true,
        },
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
