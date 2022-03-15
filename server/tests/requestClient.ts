import { GraphQLClient } from "graphql-request";

const endpoint = process.env.SERVER_URL as string;

export const client = new GraphQLClient(endpoint);
