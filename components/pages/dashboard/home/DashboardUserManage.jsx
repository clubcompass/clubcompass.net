import React from "react";
import { useAuthContext } from "../../../../context";
import { Loading } from "../../../general/Loading";
import { CustomTitle } from "../../../general/CustomTitle";
import {
  DashboardUserWrapper as CardsWrapper,
  DashboardUserManageCard,
} from "./components";

export const DashboardUserManage = ({ clubs }) => {
  if (!clubs && loadingClubs) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <>
        <CustomTitle
          title="Leadership In"
          subtitle="All the clubs you are currently have leadership in."
        />
        <CardsWrapper>
          {clubs.map((club, i) => (
            <DashboardUserManageCard key={i} club={club} />
          ))}
        </CardsWrapper>
      </>
    </div>
  );
};
