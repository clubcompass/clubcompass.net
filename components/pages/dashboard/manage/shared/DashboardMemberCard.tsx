import { useMutation } from "@apollo/client";
import { BiTrash } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { useAuthContext, useToastContext } from "../../../../../context";
import { DELETE_OUTGOING_INVITE } from "../../../../../lib/docs";
import { GetClubInvitesPayload } from "../../../../../server/graphql/club/types";
import {
  DeleteOutgoingInviteArgs,
  DeleteOutgoingInvitePayload,
} from "../../../../../server/graphql/invite/types";
import { StatusTag } from "../../../../general/StatusTag";

type Member = GetClubInvitesPayload[number];
interface Props extends Member {}

export const DashboardMemberCard = ({
  id,
  user: { firstname, lastname, ccid, email, type },
  status,
  roles,
}: Props) => {
  return (
    <div className="flex w-[26rem] flex-col gap-2">
      <div className="flex w-fit flex-row items-center gap-2">
        <StatusTag type={status} label={status} />
        <DeleteInvite id={id} />
      </div>
      <div className="flex w-full flex-row items-center justify-between rounded-lg border px-4 py-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <span className="font-medium">
              {firstname} {lastname}
            </span>
            <span className="text-[#D6D6D6]">#{ccid}</span>
          </div>
          <div>
            <span className="text-[#848484]">{email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <span className="text-base font-medium text-[#848484]">{type}</span>
          <span>{roles[0]?.name ?? "Member"}</span>
        </div>
      </div>
    </div>
  );
};

const DeleteInvite = ({ id }: { id: string }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const [deleteOutgoingInvite, { loading }] = useMutation<
    { deleteOutgoingInvite: DeleteOutgoingInvitePayload },
    DeleteOutgoingInviteArgs
  >(DELETE_OUTGOING_INVITE, {
    variables: {
      inviteId: id,
    },
    context: {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
      addToast({
        type: "info",
        title: "Successfully deleted invite.",
        message:
          "The selected invite has been deleted and will no longer be valid.",
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        type: "error",
        title: "An error occurred.",
        message:
          "This invite could not be delete at this time, please try again later.",
      });
    },
  });

  return (
    <button
      disabled={loading}
      onClick={async () => await deleteOutgoingInvite()}
      className={`${
        loading
          ? "animate-pulse cursor-not-allowed bg-gray-50 text-gray-400"
          : "bg-[#F4F4F4] text-[#3C3D41] hover:bg-red-50 hover:text-red-500"
      } inline-flex items-center gap-2 rounded-md px-2 capitalize duration-200 `}
    >
      {loading ? (
        <>
          <CgSpinner size={13} className="animate-spin" />
          <span>Deleting...</span>
        </>
      ) : (
        <>
          <BiTrash size={14} />
          <span>Delete</span>
        </>
      )}
    </button>
  );
};
