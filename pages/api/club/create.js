import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const {
    name,
    email,
    description,
    meetingDate,
    location,
    availability,
    presidentId,
    memberIds,
    tagIds,
    teacherId,
    purpose,
    membershipRequirements,
    dutiesOfMembers,
    titlesAndDutiesOfOfficers,
    selectionOfOfficers,
    officerMinimumGPA,
    percentAttendanceForOfficialMeeting,
    percentAttendanceToApproveDecision,
    projectedRevenue,
    projectedExpenses,
    links,
  } = req.body;

  let initialClubQuery = {};

  if (name !== undefined) {
    initialClubQuery.name = name;
    initialClubQuery.slug = name
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  if (email !== undefined) {
    initialClubQuery.email = email;
  }

  if (description !== undefined) {
    initialClubQuery.email = email;
  }

  if (meetingDate !== undefined) {
    initialClubQuery.email = email;
  }

  if (location !== undefined) {
    initialClubQuery.location = location;
  }

  if (tagIds !== undefined) {
    const tags = Array.from([...tagIds], (tagId) => {
      return {
        id: tagId,
      };
    });

    initialClubQuery.tags = {
      connect: tags,
    };
  }

  if (links !== undefined) {
    initialClubQuery.links = {
      create: links,
    };
  }

  if (availability !== undefined) {
    initialClubQuery.availability = availability;
  }

  initialClubQuery.roles = {
    create: [
      {
        name: "president",
        color: "#C3F4E9",
        type: "LEADERSHIP",
        description:
          "Provides leadership and direction to the club organization. Understand the club operating guidelines.",
      },
      {
        name: "vice president",
        color: "#FFEAB4",
        type: "LEADERSHIP",
        description: "Assists president in leading and managing the club.",
      },
      {
        name: "secretary",
        color: "#F3DCFE",
        type: "LEADERSHIP",
        description:
          "Schedules and coordinates club activities and meetings. Provides assistance to president.",
      },
      {
        name: "treasurer",
        color: "#FFDCE5",
        type: "LEADERSHIP",
        description: "Manages the club's revenue and expenses.",
      },
    ],
  };

  let applicationInfo = {};

  if (teacherId !== undefined) {
    applicationInfo.teacherId = {
      connect: teacherId,
    };
  }

  if (purpose !== undefined) {
    applicationInfo.purpose = purpose;
  }

  if (membershipRequirements !== undefined) {
    applicationInfo.membershipRequirements = membershipRequirements;
  }

  if (dutiesOfMembers !== undefined) {
    applicationInfo.dutiesOfMembers = dutiesOfMembers;
  }

  if (titlesAndDutiesOfOfficers !== undefined) {
    applicationInfo.titlesAndDutiesOfOfficers = titlesAndDutiesOfOfficers;
  }

  if (selectionOfOfficers !== undefined) {
    applicationInfo.selectionOfOfficers = selectionOfOfficers;
  }

  if (officerMinimumGPA !== undefined) {
    applicationInfo.officerMinimumGPA = officerMinimumGPA;
  }

  if (percentAttendanceForOfficialMeeting !== undefined) {
    applicationInfo.percentAttendanceForOfficialMeeting =
      percentAttendanceForOfficialMeeting;
  }

  if (percentAttendanceToApproveDecision !== undefined) {
    applicationInfo.percentAttendanceToApproveDecision =
      percentAttendanceToApproveDecision;
  }

  if (projectedRevenue !== undefined) {
    applicationInfo.projectedRevenue = {
      create: projectedRevenue,
    };
  }

  if (projectedExpenses !== undefined) {
    applicationInfo.projectedExpenses = {
      create: projectedExpenses,
    };
  }

  initialClubQuery.applicationInfo = applicationInfo;

  const initialClubResponse = await prisma.club.create({
    data: initialClubQuery,
    include: {
      roles: true,
    },
  });

  console.log(initialClubResponse);

  if (memberIds !== undefined) {
    for (let i = 0; i < memberIds.length; i++) {
      await prisma.user.update({
        where: {
          ccid: memberIds[i],
        },
        data: {
          invites: {
            create: {
              club: {
                connect: {
                  id: initialClubResponse.id,
                },
              },
            },
          },
        },
        include: {
          invites: {
            include: {
              club: true,
            },
          },
        },
      });
    }
  }

  await prisma.user.update({
    where: {
      id: presidentId,
    },
    data: {
      roles: {
        connect: {
          id: initialClubResponse.roles[0].id,
        },
      },
      clubs: {
        connect: {
          id: initialClubResponse.id,
        },
      },
    },
  });

  const response = await prisma.club.findUnique({
    where: {
      id: initialClubResponse.id,
    },
    include: {
      applicationInfo: {
        include: {
          teacher: true,
          projectedRevenue: true,
          projectedExpenses: true,
        },
      },
      tags: true,
      roles: true,
      editors: true,
      members: {
        include: {
          roles: true,
        },
      },
    },
  });

  return res.status(200).json({ ...response });
};
