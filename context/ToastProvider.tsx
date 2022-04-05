import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactChild,
} from "react";
import { useTransition, animated, config, useSpring } from "react-spring";
import { IoIosClose } from "react-icons/io";
import { nanoid } from "nanoid";
import { MdError } from "react-icons/md";
import { BsFillCheckCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { TiWarning } from "react-icons/ti";
import { CgSpinner } from "react-icons/cg";
import { newIssueUrl } from "../utils";

interface ToastContext {
  addToast(toast: Omit<Toast, "id">): void;
  removeToast(id: Toast["id"]): void;
}

export interface Toast {
  id: string;
  title?: string;
  message?: string;
  // extensions?
  type?: "error" | "success" | "info" | "warning" | "loading";
  progress?: boolean;
  duration?: number | null; // ms or never go away, default is 3000ms

  body?: string; // only for error
  report?: boolean; // only for error

  custom?: {
    icon: ReactChild;
    color: string;
  };
}

const ToastContext = createContext<ToastContext>({
  addToast: (): void => {},
  removeToast: (): void => {},
});

export const useToastContext = (): ToastContext => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: { children: ReactChild }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    setToasts((toasts) => [
      ...toasts,
      { id: nanoid(), ...toast }, // um...
    ]);
  };

  const removeToast = (id: Toast["id"]) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  const value = {
    addToast,
    removeToast,
  };

  const transitions = useTransition(toasts, {
    from: { opacity: 0, transform: "translate(30px, 0px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(30px, 0px)", display: "none" },
    config: config.gentle,
  });

  // animate down smoothly

  return (
    <ToastContext.Provider value={value}>
      <Toaster>
        {transitions((style, { id, ...props }) => (
          <animated.div key={id} style={style}>
            <Toast key={id} remove={() => removeToast(id)} {...props} />
          </animated.div>
        ))}
      </Toaster>
      {children}
    </ToastContext.Provider>
  );
};

type Toasts = {
  [key in Toast["type"]]: {
    icon: ReactChild;
    color: string;
    default: {
      title: Toast["title"];
      message?: Toast["message"];
    };
  };
};

const Toast = ({
  title,
  message,
  progress,
  duration,
  type,
  report,
  body,
  custom,
  remove,
}: Omit<Toast, "id"> & { remove: () => void }) => {
  const toasts: Toasts = {
    error: {
      icon: <MdError />,
      color: "#f44336",
      default: {
        title: "Something went wrong",
        message:
          "An error occurred while processing your request. Please try again later or contact support.",
      },
    },
    success: {
      icon: <BsFillCheckCircleFill />,
      color: "#2fba34",
      default: {
        title: "Success",
        message: "Your request was processed successfully.",
      },
    },
    info: {
      icon: <BsFillInfoCircleFill />,
      color: "#1C5EF9",
      default: {
        title: "Information",
        message: "This is an information message.",
      },
    },
    warning: {
      icon: <TiWarning />,
      color: "#ffbc57",
      default: {
        title: "Warning",
        message: "This action may be unsafe",
      },
    },
    loading: {
      icon: <CgSpinner className="animate-spin" />,
      color: "#000000",
      default: {
        title: "Loading...",
      },
    },
  };

  const { icon, color } = toasts[type] || {};

  // const pbar = useSpring({
  //   from: { width: "0%" },
  //   to: { width: "100%" },
  //   config: { ...config.gentle, duration: duration || 3000 },
  // });

  useEffect(() => {
    if (typeof duration !== "undefined") {
      if (duration === null) {
        return;
      }
      const timeout = setTimeout(remove, duration);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(remove, 3000);
      return () => clearTimeout(timeout);
    }
  }, [remove, duration]);

  return (
    <div
      style={{
        borderLeftWidth: "8px",
        borderColor: color,
        boxShadow: "0px 2px 20px rgb(0 0 0 / 0.10)",
        maxWidth: "30rem",
      }}
      className="relative rounded-lg bg-white px-2 py-4"
    >
      <div
        style={{
          position: "absolute",
          right: "4px",
          top: type === "loading" ? null : "4px",
        }}
      >
        <IoIosClose
          className="z-[60] cursor-pointer text-gray-500"
          size={24}
          onClick={remove}
        />
      </div>
      <div
        style={{
          marginRight: type === "loading" ? "1.5rem" : "1rem",
        }}
        className="flex items-center gap-4"
      >
        <div style={{ color, fontSize: "21px" }}>{icon}</div>
        <div style={{ width: "90%" }} className="flex flex-col items-start">
          <h4 style={{ color }} className="font-semibold">
            {title || toasts[type].default.title}
          </h4>
          {type !== "loading" && (
            <p className="text-sm text-gray-500">
              {" "}
              {message || toasts[type].default.message}
            </p>
          )}

          {type === "error" && (report || body) && (
            <div className="flex flex-row items-center gap-1">
              {report && (
                <button
                  onClick={() =>
                    window
                      .open(
                        newIssueUrl({
                          title: "Briefly describe the issue here.",
                          body: generateTemplate(body),
                          labels: ["bug"],
                          template: "bug_report.md",
                          assignee: "paul-bokelman",
                        }),
                        "_blank"
                      )
                      .focus()
                  }
                  style={{ color: "#3C3D41", backgroundColor: "#F4F4F4" }}
                  className="mt-2 rounded-md px-3 py-1 text-sm font-medium"
                >
                  Report issue
                </button>
              )}
              {body && (
                <button
                  style={{ color: "#3C3D41" }}
                  className="mt-2 rounded-md px-3 py-1 text-sm font-medium underline"
                  onClick={() => {
                    alert(body);
                  }}
                >
                  Stack trace
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <span
        style={{
          position: "absolute",
          height: "9px",
          backgroundColor: color,
          bottom: 0,
          left: 0,
          borderRadius: 3,
        }}
      /> */}
    </div>
  );
};

const Toaster = ({ children }: { children: ReactChild }) => {
  return (
    <div
      style={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 100 }}
      className="flex flex-col gap-2"
    >
      {children}
    </div>
  );
};

const generateTemplate = (body: Toast["body"]) => {
  const message = JSON.parse(body)?.message;
  const template = `
  ${message && `# ${message}`}
  
  ## Describe the bug
  A clear and concise description of what the bug is.
  
  ## To Reproduce
  Steps to reproduce the behavior:
  1. Go to '...'
  2. Click on '....'
  3. Scroll down to '....'
  4. See error
  
  ## Expected behavior
  A clear and concise description of what you expected to happen.
  
  ## Screenshots
  If applicable, add screenshots to help explain your problem.
  
  ## Desktop (please complete the following information):
   - OS: [e.g. iOS]
   - Browser [e.g. chrome, safari]
   - Version [e.g. 22]
  
  ## Smartphone (please complete the following information):
   - Device: [e.g. iPhone6]
   - OS: [e.g. iOS8.1]
   - Browser [e.g. stock browser, safari]
   - Version [e.g. 22]
  
  ## Additional context
  Add any other context about the problem here.

  ${
    body &&
    `## Stack trace
  \`\`\`js\n${body}\n\`\`\``
  }`;

  return template;
};
