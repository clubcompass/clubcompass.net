import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { InviteUsers, CurrentMembers } from "./AddMemberModal";
import { DashboardAddMemberButton as AddMemberButton } from "./DashboardAddMemberButton";
import { GetClubInvitesPayload } from "../../../../../server/graphql/club/types";

type Props = {
  members: GetClubInvitesPayload;
};

export const DashboardAddMemberModal = ({ members }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AddMemberButton onClick={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-2xl bg-white py-6 px-9 text-left align-middle shadow-xl transition-all">
                <ModalContent members={members} />
                <button onClick={closeModal} className="absolute top-3 right-4">
                  <CgClose />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const ModalContent = ({ members }: Props) => {
  // should be able to pass in props.members
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <div className="divide-y divide-red-500" />
      <div className="flex flex-col gap-6">
        <InviteUsers />
        <CurrentMembers members={members} />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-medium">Invite a new member</h3>
      <p className=" text-[#868991]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
        malesuada turpis.
      </p>
    </div>
  );
};
