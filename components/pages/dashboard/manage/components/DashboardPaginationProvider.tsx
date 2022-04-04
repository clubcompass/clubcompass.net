import {
  useEffect,
  useMemo,
  useState,
  useContext,
  createContext,
  Fragment,
  Children,
} from "react";
import type { ReactNode, ReactChild } from "react";

export interface PaginationContext {
  next: () => void;
  prev: () => void;
  step: number;
  completeSection: (name: string) => void;
  disableSection: (name: string) => void;
}

export type Section = {
  name: string;
  label: string;
  icon: ReactNode;
  header: {
    title: string;
    subtitle: string;
  };
};

interface PaginationProviderProps {
  children: ReactChild[];
  sections: Section[];
}

const PaginationContext = createContext<PaginationContext>({
  next: (): void => {},
  prev: (): void => {},
  step: 0,
  completeSection: (name: string): void => {},
  disableSection: (name: string): void => {},
});

export const usePaginationContext = (): PaginationContext => {
  return useContext(PaginationContext);
};

export const PaginationProvider = ({
  sections,
  children,
}: PaginationProviderProps) => {
  const [step, setStep] = useState<number>(2);
  const [section, setSection] = useState<Section>(sections[step]);
  const [completed, setCompleted] = useState<Section["name"][]>([]);
  const [disabled, setDisabled] = useState<Section["name"][]>([]);

  const next = (): void => {
    if (step === children.length - 1) return;
    setStep((step) => step + 1);
    setSection(sections[step]);
  };

  const prev = (): void => {
    if (step === 0) return;
    setStep((step) => step - 1);
    setSection(sections[step]);
  };

  const completeSection = (name: string): void => {
    setCompleted((completed) => [...completed, name]);
  };

  const disableSection = (name: string): void => {
    setDisabled((disabled) => [...disabled, name]);
  };

  const select = ({ name }) => {
    setSection(sections.find((section) => section.name === name));
    setStep(sections.findIndex((section) => section.name === name));
  };

  const value = {
    next,
    prev,
    step,
    completeSection,
    disableSection,
  };

  return (
    <PaginationContext.Provider value={value}>
      <div className="flex flex-col gap-4">
        <ComponentItemContainer>
          {sections.map(({ name, label, icon, header }) => (
            <ComponentItem
              key={name}
              active={section.name === name}
              select={() => select({ name })}
              complete={completed.includes(name)}
              disabled={disabled.includes(name)}
              {...{ name, label, icon, header }}
            />
          ))}
        </ComponentItemContainer>
        <Header
          title={sections[step].header.title}
          subtitle={sections[step].header.subtitle}
        />
        {children[step]}
      </div>
    </PaginationContext.Provider>
  );
};

const Header = ({ title, subtitle }: Section["header"]) => {
  return (
    <div className="my-3 flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <h4 className="text-gray-400">{subtitle}</h4>
    </div>
  );
};

const ComponentItem = ({
  name,
  label,
  icon,
  active,
  disabled,
  complete,
  select,
}) => {
  return (
    <button
      onClick={select}
      disabled={disabled}
      className="flex flex-row items-center justify-center gap-4 px-4 first:pr-4 first:pl-0 last:pr-4 last:pl-0">
      <div
        className={`${
          active ? "text-black" : "text-[#C6C6C6]"
        } flex flex-row items-center gap-2 font-medium`}>
        <span
          style={{
            color: active ? "#ffffffe7" : complete ? "#1C5EF9" : "#C6C6C6",
            backgroundColor: active
              ? "#1C5EF9"
              : complete
              ? "#1C5EF920"
              : "#FFF",
          }}
          className="flex h-8 w-8 items-center justify-center rounded-md">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>
    </button>
  );
};

const ComponentItemContainer = ({ children }: { children: ReactChild[] }) => (
  <div className="w-fit flex-col">
    <div className="flex flex-row gap-4">
      {children.map((c, i) => (
        <div key={i} className="flex flex-row">
          <>{c}</>
          {i !== children.length - 1 && (
            <span className="h-full w-[1px] bg-[#F1F1F1]" />
          )}
        </div>
      ))}
    </div>
    {/* <span className="h-0.5 w-full rounded-md bg-[#F1F1F1]" /> */}
  </div>
);
