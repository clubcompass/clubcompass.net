import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id, email, type } = req.query;

  if (id !== undefined) {
    const response = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        clubs: true,
        roles: true,
        canEdit: true,
        advisor: true,
      },
    });

    return res.status(200).json(response);
  }

  if (email !== undefined) {
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        clubs: true,
        roles: true,
        canEdit: true,
        advisor: true,
      },
    });

    return res.status(200).json(response);
  }

  if (type === "STUDENT") {
    const response = await prisma.user.findMany({
      where: {
        type: "STUDENT",
      },
      include: {
        clubs: true,
        roles: true,
        canEdit: true,
        advisor: true,
      },
    });

    return res.status(200).json([...response]);
  }

  if (type === "TEACHER") {
    const response = await prisma.user.findMany({
      where: {
        type: "TEACHER",
      },
      include: {
        clubs: true,
        roles: true,
        canEdit: true,
        advisor: true,
      },
    });

    return res.status(200).json([...response]);
  }

  const response = await prisma.user.findMany();

  return res.status(200).json([...response]);
};
