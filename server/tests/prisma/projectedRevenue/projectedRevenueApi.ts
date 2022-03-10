import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { ProjectedRevenueWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./projectedRevenueDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueProjectedRevenue = async (
  where: ProjectedRevenueWhereUniqueInput
): Promise<Client.ProjectedRevenue> => {
  const { findUniqueProjectedRevenue: uniqueProjectedRevenue } = await request(
    url,
    doc.findUniqueProjectedRevenue,
    {
      where,
    }
  );
  return uniqueProjectedRevenue;
};

export const projectedRevenue = {
  findUniqueProjectedRevenue,
};
