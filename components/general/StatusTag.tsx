import { Club, Invite } from "@prisma/client";

type Props = {
  label: string;
  type: Invite["status"] | Club["status"];
};

export const StatusTag = ({ label, type }: Props) => {
  const colors = {
    DECLINED: {
      bg: "#FDF2F2",
      fg: "#EC5962",
    },
    ACCEPTED: {
      bg: "#EDF4FE",
      fg: "#2575E5",
    },
    PENDING: {
      bg: "#FFF2E4",
      fg: "#FF921B",
    },
    DRAFT: {
      bg: "#FFF2E4",
      fg: "#FF921B",
    },
    REVIEW: {
      bg: "#FFF2E4",
      fg: "#FF921B",
    },
    APPROVED: {
      bg: "#EDF4FE",
      fg: "#2575E5",
    },
  };
  return (
    <span
      style={{ backgroundColor: colors[type].bg, color: colors[type].fg }}
      className="inline-flex items-center gap-2 rounded-md px-2 capitalize">
      <span
        style={{ backgroundColor: colors[type].fg }}
        className="h-1.5 w-1.5 rounded-full"
      />
      {label.toLowerCase()}
    </span>
  );
};
