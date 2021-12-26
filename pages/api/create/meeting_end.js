import { prisma } from "../../../config/prisma";

const meeting_end = async (req, res) => {
  const { meeting_code, summary, actions_taken, result_of_any_votes, author } =
    req.body;

  const response = await prisma.meeting.update({
    where: {
      code: meeting_code,
    },
    data: {
      status: "closed",
      endTime: new Date(),
      actions_taken: actions_taken,
      result_of_any_votes: result_of_any_votes,
      author: author,
    },
    include: {
      attendance: true,
    },
  });

  res.status(200).json({ ...response });
};

export default meeting_end;
