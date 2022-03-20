import React from "react";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
import { db } from "../../../../lib/database";
import { DashboardNavProfile } from "../../../layout/dashboard/navigation/DashboardNavProfile";
import { ChangeEmail } from "./components/ChangeEmail";

export const DashboardAccountInformation = () => {
  const { user, loading } = useAuthContext();


  if (!user && !loading) return <Loading />;

  const name = `${user?.firstname} ${user?.lastname}`;

  return (
    <div className="flex flex-col gap-2">
      <Icon name={name} />
      <InfoItem label="Name:" value={name} />
      <InfoItem label="CCID:" value={user?.ccid} />
      <InfoItem label="Email:" value={user?.email} />
      <InfoItem label="Grade:" value={user?.grade} />
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
      <div className="flex h-[4rem] w-[4rem] justify-center text-center items-center rounded-md bg-[#AFC7FF]">
        <p className="text-3xl font-semibold">{initials}</p>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="flex gap-2 text-lg">
      <label className="text-gray-500">{label}</label>
      <div className="flex gap-2">
        <p className={`${label !== "Email:" && "capitalize"}`}>{value}</p>
        {label === "Email:" && <ChangeEmail />}
      </div>
    </div>
  );
};
