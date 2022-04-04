import { BsPeopleFill } from "react-icons/bs";
import { FaFlagCheckered, FaGlobeAmericas } from "react-icons/fa";
import { IoInformationOutline } from "react-icons/io5";
import {
  DashboardNewBase as Base,
  DashboardNewMembers as Members,
  DashboardNewSocials as Socials,
  DashboardNewSummary as Summary,
} from "../../components/pages/dashboard/manage/new";
import {
  PaginationProvider as Pagination,
  Section,
} from "../../components/pages/dashboard/manage/components";
const New = () => {
  const paginationSections: Section[] = [
    {
      name: "base",
      label: "Basic Information",
      icon: <IoInformationOutline size={20} />,
      header: {
        title: "Tell us about your new club.",
        subtitle: "This is the basic information needed to create your club.",
      },
    },
    {
      name: "members",
      label: "Teacher and Members",
      icon: <BsPeopleFill size={18} />,
      header: {
        title: "Invite your advisor and leaders.",
        subtitle:
          "To be an official club, you must have an advisor and 3 other members occupying leadership roles.",
      },
    },
    {
      name: "socials",
      label: "Socials",
      icon: <FaGlobeAmericas size={18} />,
      header: {
        title: "Add links to your club.",
        subtitle:
          "Add any link to socials, websites, videos, etc. to spice up your club page.",
      },
    },
    {
      name: "status",
      label: "Review and Submit",
      icon: <FaFlagCheckered size={16} />,
      header: {
        title: "Tell us about your new club.",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu malesuada turpis.",
      },
    },
  ];

  return (
    <Pagination sections={paginationSections}>
      <Base />
      <Members />
      <Socials />
      <Summary />
    </Pagination>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default New;
