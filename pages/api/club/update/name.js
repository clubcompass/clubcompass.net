import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, name } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      slug: name
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""),
    },
  });

  return res.status(200).json({ ...response });
};
