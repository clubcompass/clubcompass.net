import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { tagSchema } from "../../../../general/tags";
import { Buttons, Header, Container } from "../components";
export const SummarySlide = ({ direct, prev, information, confirm, error }) => {
  const [loading, setLoading] = useState(false);
  const config = {
    header: {
      title: "Here's what we gathered.",
      description:
        "If the summary of your information looks accurate than submit and finish creating your Club Compass account.",
    },
    buttons: [
      {
        disabled: false,
        primary: false,
        label: "Back",
        type: "function",
        action: prev,
      },
      {
        disabled: false,
        primary: true,
        label: "Submit",
        type: "function",
        loading: loading,
        action: async () => {
          setLoading(true);
          await confirm();
          setLoading(false);
        },
      },
    ],
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <Container>
      <Header {...config.header} />
      {error && <p className="text-red-500 leading-tight text-sm">{error}</p>}
      <Summary information={information} direct={direct} />
      <Buttons buttons={config.buttons} />
    </Container>
  );
};

const Summary = ({
  information: {
    firstname,
    lastname,
    email,
    studentId,
    password,
    grade,
    interests,
  },
  direct,
}) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="w-full max-w-[650px] flex items-center justify-center border-2 border-[#F4F4F4] py-5 rounded-xl">
      <div className="w-full max-w-[90%] grid grid-cols-1 md:grid-cols-2 grid-rows-4">
        <SummaryGroup title="Full name" direct={() => direct({ slide: 4 })}>
          <div className="overflow-x-scroll whitespace-pre break-words">
            <p className="text-lg font-bold text-black">
              {firstname} {lastname}
            </p>
          </div>
        </SummaryGroup>
        <SummaryGroup title="Grade" direct={() => direct({ slide: 4 })}>
          <p className="text-lg font-bold text-black">{grade}</p>
        </SummaryGroup>
        <SummaryGroup title="Email" direct={() => direct({ slide: 2 })}>
          <div className="overflow-x-scroll whitespace-pre break-words">
            <p className="text-lg font-bold text-black">{email}</p>
          </div>
        </SummaryGroup>
        <SummaryGroup title="Student ID" direct={() => direct({ slide: 2 })}>
          <div className="overflow-x-scroll whitespace-pre break-words">
            <p className="text-lg font-bold text-black">{studentId}</p>
          </div>
        </SummaryGroup>

        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <h3 className="text-xs text-[#5D5E5E] font-semibold">Password</h3>
            <button
              onClick={() => direct({ slide: 3 })}
              className="ml-1 px-1 uppercase text-[8px] font-bold bg-cc/10 text-cc rounded-sm"
            >
              Edit
            </button>
            <div
              className="ml-1 px-1 cursor-pointer transition duration-200 ease-in-out transform text-xs bg-cc/10 text-cc rounded-sm"
              onClick={() => setShown(!shown)}
            >
              {shown ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <div
            className="flex items-center cursor-pointer w-full max-w-[14rem] overflow-x-scroll whitespace-pre break-words"
            onClick={() => setShown(!shown)}
          >
            <p className="text-lg font-bold text-black">
              {shown ? password : password.replace(/./g, "•")}
            </p>
          </div>
        </div>
        <SummaryGroup
          title="Account Verifications"
          // direct={() => direct({ slide: 2 })}
        >
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-sm font-semibold">
              Email verified:{" "}
              <span className="rounded-sm text-xs px-2 py-0.5 bg-orange-400/10 text-orange-400">
                Not Verified
              </span>
            </p>
            <p className="text-sm font-semibold">
              ASB Approved:{" "}
              <span className="rounded-sm text-xs px-2 py-0.5 bg-orange-400/10 text-orange-400">
                Unapproved
              </span>
            </p>
          </div>
        </SummaryGroup>
        <SummaryGroup
          title="Interests"
          direct={() => direct({ slide: 5 })}
          span={2}
        >
          {interests.length !== 0 ? (
            <div className="grid grid-cols-4 gap-4 mt-2">
              {interests.map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
          ) : (
            <p className="text-xs mt-2">No interests selected.</p>
          )}
        </SummaryGroup>
      </div>
    </div>
    // <div className="w-full max-w-[650px] flex items-center justify-center border-2 border-[#F4F4F4] py-5 rounded-xl">
    //   <div className="w-full max-w-[90%] flex flex-col gap-5">
    //     <div className="flex flex-row gap-4 items-center justify-start">
    //       <div className="flex flex-col gap-5 justify-around w-[50%]">
    //         <SummaryGroup title="Full name" direct={() => direct({ slide: 4 })}>
    //           <div className="overflow-x-scroll whitespace-pre break-words">
    //             <p className="text-lg font-bold text-black">
    //               {firstname} {lastname}
    //             </p>
    //           </div>
    //         </SummaryGroup>
    //         <SummaryGroup title="Email" direct={() => direct({ slide: 2 })}>
    //           <div className="overflow-x-scroll whitespace-pre break-words">
    //             <p className="text-lg font-bold text-black">{email}</p>
    //           </div>
    //         </SummaryGroup>
    //         <SummaryGroup
    //           title="Student ID"
    //           direct={() => direct({ slide: 2 })}
    //         >
    //           <div className="overflow-x-scroll whitespace-pre break-words">
    //             <p className="text-lg font-bold text-black">{studentId}</p>
    //           </div>
    //         </SummaryGroup>
    //       </div>
    //       <div className="flex flex-col gap-5 justify-around">
    //         <SummaryGroup title="Grade" direct={() => direct({ slide: 4 })}>
    //           <p className="text-lg font-bold text-black">{grade}</p>
    //         </SummaryGroup>

    //         <div className="flex flex-col">
    //           <div className="flex flex-row items-center">
    //             <h3 className="text-xs text-[#5D5E5E] font-semibold">
    //               Password
    //             </h3>
    //             <button
    //               onClick={() => direct({ slide: 3 })}
    //               className="ml-1 px-1 uppercase text-[8px] font-bold bg-cc/10 text-cc rounded-sm"
    //             >
    //               Edit
    //             </button>
    //             <div
    //               className="ml-1 px-1 cursor-pointer transition duration-200 ease-in-out transform text-xs bg-cc/10 text-cc rounded-sm"
    //               onClick={() => setShown(!shown)}
    //             >
    //               {shown ? <AiFillEye /> : <AiFillEyeInvisible />}
    //             </div>
    //           </div>

    //           <div
    //             className="flex items-center cursor-pointer w-full max-w-[14rem] overflow-x-scroll whitespace-pre break-words"
    //             onClick={() => setShown(!shown)}
    //           >
    //             <p className="text-lg font-bold text-black">
    //               {shown ? password : password.replace(/./g, "•")}
    //             </p>
    //           </div>
    //         </div>
    //         <SummaryGroup
    //           title="Account Verifications"
    //           direct={() => direct({ slide: 2 })}
    //         >
    //           <div className="flex flex-col gap-1 mt-2">
    //             <p className="text-sm font-semibold">
    //               Email verified:{" "}
    //               <span className="rounded-md text-xs px-2 py-0.5 bg-orange-400/10 text-orange-400">
    //                 Not Verified
    //               </span>
    //             </p>
    //             <p className="text-sm font-semibold">
    //               ASB Approved:{" "}
    //               <span className="rounded-md text-xs px-2 py-0.5 bg-orange-400/10 text-orange-400">
    //                 Unapproved
    //               </span>
    //             </p>
    //           </div>
    //         </SummaryGroup>
    //       </div>
    //     </div>
    //     <div>
    //       <SummaryGroup title="Interests" direct={() => direct({ slide: 5 })}>
    //         {interests.length !== 0 ? (
    //           <div className="grid grid-cols-4 gap-4 mt-2">
    //             {interests.map((tag) => (
    //               <Tag key={tag.id} tag={tag} />
    //             ))}
    //           </div>
    //         ) : (
    //           <p className="text-xs mt-2">No interests selected.</p>
    //         )}
    //       </SummaryGroup>
    //     </div>
    //   </div>
    // </div>
  );
};

const SummaryGroup = ({ title, children, direct, span }) => {
  return (
    <div className="flex flex-col" style={{ gridColumn: `span ${span || 1}` }}>
      <div className="flex flex-row items-center">
        <h3 className="text-xs text-[#5D5E5E] font-semibold">{title}</h3>
        {direct && (
          <button
            onClick={direct}
            className="ml-1 px-1 uppercase text-[8px] font-bold bg-cc/10 text-cc rounded-sm"
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export const Tag = ({ tag }) => {
  const clr =
    tagSchema[tag.name] === undefined ? "#D0F0FE" : tagSchema[tag.name].bg;
  return (
    <span
      style={{ backgroundColor: clr }}
      className="flex text-center items-center justify-center py-2 rounded uppercase font-extrabold text-[0.6rem] text-[#344357]"
    >
      {tag.name}
    </span>
  );
};
