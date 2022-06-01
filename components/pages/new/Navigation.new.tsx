import classnames from "classnames";

export type Section = { name: string; label: string };
export type Sections = Array<Section>;

type Props = {
  sections: Sections;
  current: string;
  updateSection: (section: Section["name"]) => void;
};

export const Navigation = ({ sections, current, updateSection }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {sections.map(({ name, label }, i) => (
        <NavigationItem
          key={i}
          name={name}
          label={label}
          active={name === current}
          updateSection={() => updateSection(name)}
        />
      ))}
    </div>
  );
};

const NavigationItem = ({
  name,
  label,
  active,
  updateSection,
}: Section & { active: boolean; updateSection: () => void }) => {
  return (
    <button
      className="relative flex flex-row items-center gap-4"
      onClick={updateSection}
    >
      {active && (
        <span className="absolute -left-5 h-2 w-2 rounded-full bg-cc" />
      )}
      <p
        className={classnames(
          {
            "text-[#DDDDDD]": !active,
            "text-black": active,
          },
          "text-[14px] capitalize"
        )}
      >
        {label}
      </p>
    </button>
  );
};
