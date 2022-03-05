import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "micro-cors";
import { schemas } from "../../apollo/schemas";
import { resolvers } from "../../apollo/resolvers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const Cors = cors();

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();

export default Cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
