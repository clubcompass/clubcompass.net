import {
  Fragment,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTransition, animated, config } from "react-spring";

import { CgClose } from "react-icons/cg";

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children, closeColor }) => {
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
    isOpen: isOpen,
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

  return (
    <ModalContext.Provider value={value}>
      {children[0]}
      <ModalContainer
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        closeColor={closeColor}
        index={index}>
        {transition((style, item) => (
          <animated.div style={style}>{children[index]}</animated.div>
        ))}
      </ModalContainer>
    </ModalContext.Provider>
  );
};

const ModalContainer = ({
  isOpen,
  closeModal,
  children,
  closeColor,
  index,
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-[90vh] align-middle"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="my-8 inline-block w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {children}
                <button
                  onClick={closeModal}
                  style={{
                    color:
                      closeColor?.index === index
                        ? closeColor?.color
                        : "#9AA3B0",
                  }}
                  className="absolute top-3 right-4">
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
