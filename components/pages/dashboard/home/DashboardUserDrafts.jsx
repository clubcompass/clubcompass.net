import React from "react";
import { useState } from "react";
import { CopyText } from "../../../general/CopyText";
import { MdContentCopy } from "react-icons/md";
import { CustomTitle } from "../../../general/CustomTitle";
import {
  DashboardUserWrapper as CardsWrapper,
  DashboardUserDraftsCard,
} from "./components";

export const DashboardUserDrafts = ({ clubs }) => {
  return (
    <div className="flex flex-col gap-4">
      <CustomTitle
        title="Continue Editing"
        subtitle="Some of your clubs are still drafts, continue editing them to send for approval."
      />
      <CardsWrapper>
        {clubs.map((club, i) => (
          <DashboardUserDraftsCard key={i} club={club} />
        ))}
      </CardsWrapper>
    </div>
  );
};
