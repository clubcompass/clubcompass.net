import React, { useState } from "react";
import { Loading } from "../../../general/Loading";
import { useAuthContext, useToastContext } from "../../../../context";
import { db } from "../../../../lib/database";
import { DashboardNavProfile } from "../../../layout/dashboard/navigation/DashboardNavProfile";
import { ChangeEmail } from "./components/ChangeEmail";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../../lib/docs";

export const DashboardAccountInformation = () => {
  const { user } = useAuthContext();

  if (!user && !loading) return <Loading />;

  const name = `${user?.firstname} ${user?.lastname}`;

  const {
    data: { getUserProfile: { studentId, grade, interests } = {} } = {},
    loading,
  } = useQuery(GET_USER_PROFILE, {
    context: { headers: { authorization: `Bearer ${user.token}` } },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-8">
      {/* <Icon name={name} /> */}
      <div className="flex gap-12">
        <InfoItem label="Name" value={name} />
        <InfoItem label="CCID" value={user?.ccid} />
      </div>
      <div className="flex gap-12">
        <InfoItem label="Grade" value={grade.toLowerCase()} />
        <InfoItem label="StudentID" value={studentId} />
      </div>
      <InfoItem label="Email" value={user?.email} />
      <InfoItem />
    </div>
  );
};

const Icon = ({ name }) => {
  const initials = (
    name.split(" ").shift().charAt(0) + name.split(" ").pop().charAt(0)
  ).toUpperCase();
  return (
    <div className="flex">
      <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-md bg-[#AFC7FF] text-center">
        <p className="text-3xl font-semibold">{initials}</p>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label className="text-md text-gray-300">{label}</label>
        {label === "Email" && <ChangeEmail />}
      </div>
      <div className="flex gap-2 text-lg">
        {label === "CCID" ? (
          <CopyText value={value}>{value}</CopyText>
        ) : (
          <p className={`${label !== "Email" && "capitalize"}`}>{value}</p>
        )}
      </div>
    </div>
  );
};

const CopyText = ({ value, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { addToast } = useToastContext();

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (e) {
      addToast({
        type: "error",
        title: "An error has occurred",
        message:
          "Unable to copy text. Your browser probably doesn't support this feature. Try switching to another browser.",
        duration: 10000,
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`${
        isCopied ? "bg-[#EBFAE2] text-[#2A9E00]" : "bg-[#EBF2FF] text-[#2B61F0]"
      } rounded-md px-3`}>
      {isCopied ? "Copied!" : children}
    </button>
  );
};
