import { useState } from "react";
import { BsCheck, BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import { IoInformationOutline } from "react-icons/io5";
import { VscGlobe } from "react-icons/vsc";
import {
  DashboardNewBase as Base,
  DashboardNewMembers as Members,
  DashboardNewSocials as Socials,
  DashboardNewSummary as Summary,
} from "../../../../components/pages/dashboard/manage/new";
import { DashboardPagination as Pagination } from "../../../../components/pages/dashboard/manage/components";
import { MdOutlinePeopleAlt } from "react-icons/md";
const New = () => {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState({
    base: true,
    members: false,
    socials: false,
    summary: false,
  });

  const [disabled, setDisabled] = useState({
    // base: false,
    // members: !complete.base,
    // socials: !complete.base || !complete.members,
    // // status is disabled when members and base are not complete
    // status: !complete.base || !complete.members || !complete.socials,
    base: false,
    members: false,
    socials: false,
    summary: false,
  });

  const nav = {
    next: () => {
      setStep((step) => step + 1);
    },

    prev: () => {
      setStep((step) => step - 1);
    },
  };

  // should just be dashboard/new?
  const paginationOptions = {
    DashboardNewBase: {
      name: "base",
      label: "Basic Information",
      // icon: <BsCheck size={18} />,
      icon: <IoInformationOutline size={24} />,
      complete: complete.base,
      disabled: disabled.base,
    },
    DashboardNewMembers: {
      name: "members",
      label: "Teacher and Members",
      icon: <MdOutlinePeopleAlt size={24} />,
      complete: complete.members,
      disabled: disabled.members,
    },
    DashboardNewSocials: {
      name: "socials",
      label: "Socials",
      icon: <VscGlobe size={24} />,
      complete: complete.socials,
      disabled: disabled.socials,
    },
    DashboardNewSummary: {
      name: "status",
      label: "Review and Submit",
      icon: <FaFlagCheckered size={20} />,
      complete: complete.status,
      disabled: disabled.status,
    },
  };
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* p-6 */}
      <h1 className="text-base font-bold uppercase text-[#626262]">New Club</h1>
      <Pagination step={step} setStep={setStep} options={paginationOptions}>
        {/* transition to render props pattern */}
        {/* {({ next, prev }) => ( */}
        <Base {...nav} />
        <Members {...nav} />
        <Socials {...nav} />
        <Summary {...nav} />
        {/* )} */}
      </Pagination>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
      protected: true,
    },
  };
};

export default New;
