import { useState, Children, useEffect, useMemo } from "react";

export const DashboardPagination = ({ options, step, setStep, children }) => {
  // const [index,setIndex ] = useState(0);
  const sections = useMemo(
    () => Children.toArray(children).map((c) => c.type.name),
    [children]
  );
  // const section = sections[index];
  const [section, setSection] = useState(sections[0]);

  const components = Children.toArray(children);

  const select = ({ name }) => {
    setSection(name);
    setStep(sections.indexOf(name));
  };

  useEffect(() => {
    setSection(sections[step]);
  }, [sections, step]);

  return (
    <div className="flex flex-col gap-4">
      <ComponentItemContainer>
        {components.map((c, i) => (
          <ComponentItem
            key={c.type.name}
            active={c.type.name === section}
            select={() => select({ name: c.type.name })}
            {...options[c.type.name]}
          />
        ))}
      </ComponentItemContainer>
      {components.map((c) => (
        <div
          key={c.type.name}
          className={`flex flex-col gap-4 ${
            c.type.name === section ? "block" : "hidden"
          }`}>
          {c}
          {/* {c({
            next: () => setSection(c.type.name),
            prev: () => setSection(c.type.name),
          })} */}
        </div>
      ))}
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

const ComponentItemContainer = ({ children }) => (
  <div className="my-2 w-fit flex-col gap-4 ">
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

// import { useState, Children } from "react";
// // use render props ? "withPagination?"
// export const DashboardPagination = ({ step, options, children }) => {
//   const [section, setSection] = useState(
//     Children.toArray(children).map((c) => c.type.name)[0]
//   );
//   const components = Children.toArray(children);

//   return (
//     <div className="flex flex-col gap-4">
//       <ComponentItemContainer>
//         {components.map((c, i) => (
//           <ComponentItem
//             key={c.type.name}
//             steps={{ current: i + 1, total: components.length }}
//             active={c.type.name === section}
//             select={() => setSection(c.type.name)}
//             {...options[c.type.name]}
//           />
//         ))}
//       </ComponentItemContainer>
//       {components.map((c) => (
//         <div
//           key={c.type.name}
//           className={`flex flex-col gap-4 ${
//             c.type.name === section ? "block" : "hidden"
//           }`}
//         >
//           {c}
//         </div>
//       ))}
//     </div>
//   );
// };

// const ComponentItem = ({
//   name,
//   label,
//   steps,
//   icon,
//   active,
//   disabled,
//   complete,
//   select,
// }) => {
//   return (
//     <button
//       onClick={select}
//       disabled={disabled}
//       className="flex flex-row items-center justify-center gap-4 px-4"
//     >
//       <div
//         className={`${
//           active ? "text-black" : "text-[#C6C6C6]"
//         } flex flex-row items-center gap-2 font-medium`}
//       >
//         <div
//           style={{
//             color: active ? "#ffffffe7" : complete ? "#1C5EF9" : "#C6C6C6",
//             backgroundColor: active
//               ? "#1C5EF9"
//               : complete
//               ? "#1C5EF920"
//               : "#FFF",
//           }}
//           className="flex h-[35px] w-[35px] items-center justify-center rounded-full"
//         >
//           {icon}
//         </div>
//         {active && (
//           <div className="flex flex-col items-start justify-start">
//             <span className="text-xs text-cc">
//               Step {steps.current}/{steps.total}
//             </span>
//             <span className="text-sm">{label}</span>
//           </div>
//         )}
//       </div>
//     </button>
//   );
// };

// const ComponentItemContainer = ({ children }) => (
//   <div className="my-2 w-fit flex-col gap-4 rounded-lg border border-[#F1F1F1] p-2">
//     <div className="flex flex-row">
//       {children.map((c, i) => (
//         <div key={i} className="flex flex-row">
//           <>{c}</>
//           {i !== children.length - 1 && (
//             <span className="h-full w-[1px] bg-[#F1F1F1]" />
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// );
