import { GetClubInvitesPayload } from "../../../../../../server/graphql/club/types";

export const CurrentMembers = ({
  members,
}: {
  members: GetClubInvitesPayload;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-medium text-[#424242]">Members</h4>
      <div className="flex max-h-40 flex-col gap-4 overflow-y-scroll">
        {members.length === 0 && (
          <p className="text-sm">
            You current have no members, go invite some!
          </p>
        )}
        {members.map((member) => (
          <Member key={member.user.ccid} {...member} />
        ))}
      </div>
    </div>
  );
};

const Member = ({
  status,
  user: { firstname, lastname, ccid },
  roles,
}: GetClubInvitesPayload[number]) => {
  const colors = {
    PENDING: "#FF921B",
    ACCEPTED: "#2575E5",
    DECLINED: "#FF6464",
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <span
          style={{ backgroundColor: colors[status] }}
          className="h-2 w-2 rounded-full"
        />
        <div className="flex flex-row items-center gap-1">
          <h5>
            {firstname} {lastname}
          </h5>
          <span className="text-sm text-[#D6D6D6]">#{ccid}</span>
        </div>
      </div>
      <p className="capitalize">{roles[0]?.name || "member"}</p>
    </div>
  );
};
