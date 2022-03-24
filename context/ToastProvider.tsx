import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  ReactChild,
} from "react";
import { useTransition, animated, config } from "react-spring";
import { IoIosClose } from "react-icons/io";
import { MdError } from "react-icons/md";
interface ToastContext {
  addToast(toast: Omit<Toast, "id">): void;
  removeToast(id: Toast["id"]): void;
  index: number;
}

export interface Toast {
  id: number;
  title: string;
  message: string;
  options: {
    type?: "error" | "success";
    duration?: number | null; // ms or never go away, default is 3000ms
  };
}

const ToastContext = createContext<ToastContext>({
  addToast: (): void => {},
  removeToast: (): void => {},
  index: 0,
});

export const useToastContext = (): ToastContext => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: { children: ReactChild }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [index, setIndex] = useState(0);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      setToasts((toasts) => [
        ...toasts,
        { id: toasts[toasts.length - 1]?.id + 1 || 1, ...toast }, // um...
      ]);
      setIndex(index + 1);
    },
    [index]
  );

  const removeToast = useCallback((id: Toast["id"]) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) {
      setIndex(0);
    }
  }, [toasts]);

  const value = {
    addToast,
    removeToast,
    index,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toaster>
        {toasts.map(({ id, title, message, options }, i) => (
          <Toast
            key={i}
            title={title}
            message={message}
            options={options}
            remove={() => removeToast(id)}
          />
        ))}
      </Toaster>
      {children}
    </ToastContext.Provider>
  );
};

const Toast = ({
  title,
  message,
  options,
  remove,
}: {
  title: Toast["title"];
  message: Toast["message"];
  options?: Toast["options"];
  remove: () => void;
}) => {
  useEffect(() => {
    if (typeof options?.duration !== "undefined") {
      if (options.duration === null) {
        return;
      }
      const timeout = setTimeout(remove, options.duration);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(remove, 3000);
      return () => clearTimeout(timeout);
    }
  }, [remove, options?.duration]);

  return (
    <div className="relative w-[25rem] rounded-lg border-l-8 border-red-500 bg-white px-2 py-4 drop-shadow-md">
      <div className="absolute right-1 top-1">
        <IoIosClose
          className="z-[60] cursor-pointer text-red-500"
          size={24}
          onClick={remove}
        />
      </div>
      <div className="flex items-center gap-4">
        <div>
          <MdError className="text-red-500" size={25} />
        </div>
        <div>
          <h4 className="text-red-500">{title}</h4>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

const Toaster = ({ children }: { children: ReactChild[] }) => {
  return (
    <div className="h-full align-baseline">
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
};
