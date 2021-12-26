import { prisma } from "../../../../config/prisma";

const tags = async (req, res) => {
  const { club_id, tag_ids } = req.body;

  const tags = Array.from([...tag_ids], (tag_id) => {
    return {
      id: tag_id,
    };
  });

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      tags: {
        set: [],
        connect: tags,
      },
    },
    include: {
      tags: true,
    },
  });

  // const response = await prisma.club.update({
  //   where: {
  //     id: club_id,
  //   },
  //   data: {
  //     tags: {
  //       set: [],
  //       create: tags,
  //     },
  //   },
  //   include: {
  //     tags: {
  //       select: {
  //         tag: true,
  //       },
  //     },
  //     president: true,
  //     members: true,
  //   },
  // });

  res.status(200).json({ ...response });
};

export default tags;
