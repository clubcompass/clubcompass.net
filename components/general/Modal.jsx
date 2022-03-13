import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { MdFlipToFront } from "react-icons/md";
import { useTransition, animated, config } from "react-spring";
import Confetti from "react-dom-confetti";

import { CgClose } from "react-icons/cg";

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children, confetti }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(1);
  const [left, setLeft] = useState(false);

  const handleNext = () => {
    if (index + 1 <= children.length - 1) {
      setIndex((index) => index + 1);
      setLeft(false);
    }
  };

  const handlePrev = () => {
    if (index - 1 !== 0) {
      setIndex((index) => index - 1);
      setLeft(true);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIndex(1);
      }, 300);
    }
  }, [isOpen]);

  const value = {
    closeModal: () => setIsOpen(false),
    openModal: () => setIsOpen(true),
    next: () => handleNext(),
    prev: () => handlePrev(),
  };

  const transition = useTransition(index, {
    from: {
      opacity: 0,
      transform: `translate(${left ? "15px" : "-15px"}, 0px)`,
    },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
  });

  const config = {
    angle: 90,
    spread: 150,
    startVelocity: 40,
    elementCount: 50,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 5,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <ModalContext.Provider value={value}>
      {children[0]}
      <ModalContainer isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        {confetti && (
          <div className="flex justify-center -translate-y-10">
            <Confetti active={index === children.length - 1} config={config} />
          </div>
        )}
        {transition((style, item) => (
          <animated.div style={style}>{children[index]}</animated.div>
        ))}
      </ModalContainer>
    </ModalContext.Provider>
  );
};

const ModalContainer = ({ isOpen, closeModal, children }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-[90vh] align-middle"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {children}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-4 text-gray-400"
                >
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
