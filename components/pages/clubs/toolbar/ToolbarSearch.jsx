import {
  Fragment,
  useEffect,
  useState,
  useCallback,
  createRef,
  useRef,
  useLayoutEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiSearch } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { BsPeopleFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

export const ToolbarSearch = ({ staticClubs, updateClubs }) => {
  const [q, set] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const results = staticClubs.filter((club) => {
    return club.name.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <>
      <div className="z-30 flex flex-row items-center gap-2">
        <div className="relative inline-block">
          <button
            onClick={open}
            className="flex flex-row items-center gap-2 rounded-lg border-[1px] py-1 pl-2 pr-12 text-sm font-semibold text-gray-400 outline-none"
          >
            <FaSearch size={13} /> <span>Quick Search...</span>
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={close}
        >
          <div className="relative min-h-screen px-4 text-center">
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
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative top-16 my-8 inline-flex w-[46rem] origin-top transform flex-col gap-4 divide-y-2 divide-gray-100 overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                <Search q={q} set={set} close={close} />
                <Results results={results} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Search = ({ q, set, close }) => {
  return (
    <div className="flex flex-row items-center justify-between px-6 pt-6">
      <div className="flex flex-row items-center gap-4">
        <FaSearch color="#B4B5BF" size={25} />
        <input
          className="w-full text-xl font-medium text-black outline-none"
          placeholder="Robotics Club..."
          value={q}
          maxLength={64}
          onChange={(e) => set(e.target.value)}
        />
      </div>
      <div
        onClick={() => {
          if (q === "") {
            return close();
          }
          return set("");
        }}
        className="flex cursor-pointer items-center justify-center rounded-md bg-gray-100 p-1.5"
      >
        <CgClose size={16} />
      </div>
    </div>
  );
};

const Results = ({ results }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const current = results[index]?.id;
  const outer = useRef(null); // unused?
  const items = useRef([]);
  items.current = results.map((_, i) => items.current[i] ?? createRef());

  const handleKeyDown = useCallback(
    ({ keyCode }) => {
      if (keyCode === 40 && index < results.length - 1) {
        items.current[index + 1].current.scrollIntoView();
        index === results.length - 2
          ? (outer.current.scrollBottom = 0)
          : (outer.current.scrollTop -= 30);
        setIndex(index + 1);
        // items.current[index]?.scrollIntoView();
        // scroll();
      }
      if (keyCode === 38 && index > 0) {
        // scroll to item
        items.current[index - 1].current.scrollIntoView();
        index === 1
          ? (outer.current.scrollTop = 0)
          : (outer.current.scrollTop -= 20);

        setIndex(index - 1);

        // items.current[index]?.scrollIntoView();
        // scroll();
      }
      if (keyCode === 13) {
        router.push(`/club/${results[index].slug}`);
        // updateClubs(results[index].id); // programmatically redirect to club page
      }
    },
    [index, results, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      // remove offset scroll from keys
    };
  }, [results.length, handleKeyDown]);

  const Result = ({ r, i }) => {
    const colors = {
      OPEN: {
        bg: "#EBFAE2",
        fg: "#2A9E00",
      },
      CLOSED: {
        bg: "#FDF2F2",
        fg: "#EC5962",
      },

      INVITE_ONLY: {
        bg: "#FFF2E4",
        fg: "#FF921B",
      },
    };
    const active = r.id === current;
    return (
      <div
        onMouseEnter={() =>
          setIndex(results.findIndex((club) => club.id === r.id))
        }
        onClick={() => router.push(`/club/${r.slug}`)}
        ref={items.current[i]}
        className={`${
          active && "bg-cc/5" //border shadow-md shadow-gray-200
        } flex cursor-pointer flex-row items-end justify-between gap-2 rounded-lg px-3 py-2.5 text-black`}
      >
        <div className="flex max-w-lg flex-col gap-1">
          <span className={`${active && "text-cc"} font-semibold`}>
            {r.name}
          </span>

          <div className="flex flex-row items-center gap-2">
            <div
              className={`${
                active ? "bg-cc text-white" : "bg-gray-100"
              } flex w-fit flex-row items-center gap-1.5 rounded-[4px]  px-2 py-1 text-xs`}
            >
              <BsPeopleFill />
              <span className="font-bold capitalize">{r._count.members}</span>
            </div>
            <div
              style={{
                backgroundColor: active
                  ? "rgb(28 94 249 / 0.05)"
                  : colors[r.availability].bg,
                color: active ? "#1C5EF9" : colors[r.availability].fg,
              }}
              className="flex flex-row items-center gap-1 rounded-[4px] px-3 py-1 "
            >
              <span
                style={{
                  backgroundColor: active
                    ? "#1C5EF9"
                    : colors[r.availability].fg,
                }}
                className="h-1 w-1 rounded-full "
              />
              <span className="text-xs font-medium capitalize">
                {r.availability.replace("_", " ").toLowerCase()}
              </span>
            </div>
          </div>

          <span className="text-xs text-gray-600">{r.description}</span>
        </div>

        {/* <div className="flex flex-row items-center"> */}
        {/* Select */}

        {r.id === current && (
          <kbd className="inline-flex min-h-[2em] min-w-[2em] items-center justify-center rounded-md border-[1px] border-b-[2px] border-gray-500/20 bg-gray-50 px-[0.5rem] text-xs">
            Enter
          </kbd>
        )}

        {/* </div> */}
      </div>
    );
  };
  return (
    <div className="max-h-[27rem] overflow-y-scroll px-6 py-4 " ref={outer}>
      {results.map((r, i) => (
        <Result key={i} r={r} i={i} />
      ))}
      {results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <FaSearch color="#B4B5BF" size={25} />
          <span className="text-xl font-medium text-gray-600">
            No results found
          </span>
        </div>
      )}
    </div>
  );
};
