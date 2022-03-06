import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "micro-cors";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

const Cors = cors();

export default Cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const schema = await buildSchema({
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    resolvers: resolvers as any,
    context: (req) => ({
      ...req,
      prisma: new PrismaClient(),
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  const startServer = server.start();

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
