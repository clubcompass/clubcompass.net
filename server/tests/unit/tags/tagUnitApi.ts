import * as Client from "@prisma/client";
import { client } from "../../requestClient";
import { GET_TAGS } from "./tagUnitDocuments";
// bring in payload and args!!
export const getTags = async (): Promise<
  Client.Tag[] & { approvedCount: number }
> => {
  const { getTags: tags } = await client.request(GET_TAGS);

  return tags;
};
