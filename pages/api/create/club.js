import { prisma } from "../../../config/prisma";

const club = async (req, res) => {
  const {
    name,
    slug,
    email,
    teacher,
    meeting_time,
    meeting_location,
    description,
    membership_requirements,
    duties_of_members,
    titles_and_duties_of_officers,
    selection_of_officers,
    officer_minimum_gpa,
    minimum_percent_of_members_for_meeting,
    minimum_percent_of_members_for_approving_decision,
    president_contact,
    link,
    link_name,
    image_links,
    image_captions,
    tag_ids,
    president_id,
    vice_president_id,
    secretary_id,
    treasurer_id,
  } = req.body;

  const tags = Array.from([...tag_ids], (tag_id) => {
    return {
      id: tag_id,
    };
  });

  let data = {
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
    teacher: teacher,
    meeting_time: meeting_time,
    meeting_location: meeting_location,
    description: description,
    membership_requirements: membership_requirements,
    duties_of_members: duties_of_members,
    titles_and_duties_of_officers: titles_and_duties_of_officers,
    selection_of_officers: selection_of_officers,
    officer_minimum_gpa: officer_minimum_gpa,
    minimum_percent_of_members_for_meeting:
      minimum_percent_of_members_for_meeting,
    minimum_percent_of_members_for_approving_decision:
      minimum_percent_of_members_for_approving_decision,
    president_contact: president_contact,
    tags: {
      connect: tags,
    },
    president: {
      connect: {
        id: president_id,
      },
    },
    vicePresident: {
      connect: {
        id: vice_president_id,
      },
    },
    secretary: {
      connect: {
        id: secretary_id,
      },
    },
    treasurer: {
      connect: {
        id: treasurer_id,
      },
    },
  };

  if (link !== undefined) {
    data.link = link;
    data.link_name = link_name;
  }

  if (image_links !== undefined) {
    data.image_links = image_links;
    data.image_captions = image_captions;
  }

  const response = await prisma.club.create({
    data: data,
    include: {
      tags: true,
      president: true,
      vicePresident: true,
      secretary: true,
      treasurer: true,
    },
  });

  res.status(200).json({ ...response });
};

export default club;
