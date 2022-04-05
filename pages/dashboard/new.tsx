import { BsPeopleFill } from "react-icons/bs";
import { FaFlagCheckered, FaGlobeAmericas } from "react-icons/fa";
import { IoInformationOutline } from "react-icons/io5";
import {
  DashboardNewBase as Base,
  DashboardNewMembers as Members,
  DashboardNewLinks as Links,
  DashboardNewSummary as Summary,
} from "../../components/pages/dashboard/manage/new";
import {
  PaginationProvider as Pagination,
  Section,
} from "../../components/pages/dashboard/manage/components";
import { ManagementProvider } from "../../components/pages/dashboard/manage/context";
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
        title: "Review your club.",
        subtitle:
          "Here's all the information we've gathered. Make sure to look it over before you submit your club for review.",
      },
    },
  ];

  return (
    <ManagementProvider>
      <Pagination sections={paginationSections}>
        <Base />
        <Members />
        <Links />
        <Summary />
      </Pagination>
    </ManagementProvider>
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
