import * as Client from "@prisma/client";
import { request } from "graphql-request";
import { ProjectedExpensesWhereUniqueInput } from "../../../graphql/resolversTypes";
import * as doc from "./projectedExpensesDocuments";
const url = process.env.SERVER_URL as string;

export const findUniqueProjectedExpenses = async (
  where: ProjectedExpensesWhereUniqueInput
): Promise<Client.ProjectedExpenses> => {
  const { findUniqueProjectedExpenses: uniqueProjectedExpenses } =
    await request(url, doc.findUniqueProjectedExpenses, {
      where,
    });
  return uniqueProjectedExpenses;
};

export const projectedExpenses = {
  findUniqueProjectedExpenses,
};
