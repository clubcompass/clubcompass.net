import { Context } from "../../ctx";
import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type SendClubForApprovalArgs = {
  clubId: Club["id"];
};

export type SendClubForApprovalPayload = Awaited<
  ReturnType<typeof sendClubForApproval>
>;

export const sendClubForApproval = async (
  _parent: any,
  { clubId }: SendClubForApprovalArgs,
  { prisma }: Context
): Promise<typeof club> => {
  const club = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      status: "REVIEW",
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });

  if (!club) throw new ApolloError("Club was not found", "NO_CLUB", { clubId });

  return club;
};
