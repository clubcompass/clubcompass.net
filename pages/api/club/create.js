import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const {
    name,
    email,
    description,
    meetingDate,
    location,
    president,
    vicePresident,
    secretary,
    treasurer,
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

  const tags = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const members = Array.from([...memberIds], (memberId) => {
    return {
      id: memberId,
    };
  });

  const editors = [
    { id: president.id },
    { id: vicePresident.id },
    { id: secretary.id },
  ];

  let applicationInfo = {
    teacher: {
      connect: {
        id: teacherId,
      },
    },
    purpose: purpose,
    membershipRequirements: membershipRequirements,
    dutiesOfMembers: dutiesOfMembers,
    titlesAndDutiesOfOfficers: titlesAndDutiesOfOfficers,
    selectionOfOfficers: selectionOfOfficers,
    officerMinimumGPA: officerMinimumGPA,
    percentAttendanceForOfficialMeeting: percentAttendanceForOfficialMeeting,
    percentAttendanceToApproveDecision: percentAttendanceToApproveDecision,
  };

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

  let club = {
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
      email: email,
      description: description,
      meetingDate: meetingDate,
      location: location,
      applicationInfo: {
        create: applicationInfo,
      },
      roles: {
        create: [
          {
            name: "president",
            color: president.color,
            type: "LEADERSHIP",
            description: president.description,
          },
          {
            name: "vice president",
            color: vicePresident.color,
            type: "LEADERSHIP",
            description: vicePresident.description,
          },
          {
            name: "secretary",
            color: secretary.color,
            type: "LEADERSHIP",
            description: secretary.description,
          },
          {
            name: "treasurer",
            color: treasurer.color,
            type: "LEADERSHIP",
            description: treasurer.description,
          },
        ],
      },
      tags: {
        connect: tags,
      },
      members: {
        connect: members,
      },
      editors: {
        connect: editors,
      },
    },
    include: {
      roles: true,
    },
  };

  if (links !== undefined) {
    club.data.links = {
      create: links,
    };
  }

  const initialClub = await prisma.club.create(club);

  await prisma.user.update({
    where: {
      id: president.id,
    },
    data: {
      roles: {
        connect: {
          id: initialClub.roles[0].id,
        },
      },
      clubs: {
        connect: {
          id: initialClub.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: vicePresident.id,
    },
    data: {
      roles: {
        connect: {
          id: initialClub.roles[1].id,
        },
      },
      clubs: {
        connect: {
          id: initialClub.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: secretary.id,
    },
    data: {
      roles: {
        connect: {
          id: initialClub.roles[2].id,
        },
      },
      clubs: {
        connect: {
          id: initialClub.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: treasurer.id,
    },
    data: {
      roles: {
        connect: {
          id: initialClub.roles[3].id,
        },
      },
      clubs: {
        connect: {
          id: initialClub.id,
        },
      },
    },
  });

  const response = await prisma.club.findUnique({
    where: {
      id: initialClub.id,
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
