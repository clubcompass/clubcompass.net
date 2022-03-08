import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "micro-cors";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import { GraphQLResolveInfo, GraphQLSchema } from "graphql";
import { createContext, Context } from "../../server/graphql/ctx";
import { resolvers, typeDefs } from "../../server/graphql";
import { PrismaSelect } from "@paljs/plugins";

const Cors = cors();

let schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

const middleware = async (
  resolve: any,
  root: unknown,
  args: { [key: string]: unknown },
  context: Context,
  info: GraphQLResolveInfo
) => {
  const result = new PrismaSelect(info).value;
  if (Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return resolve(root, args, context, info);
};

schema = applyMiddleware(schema, middleware);

export default Cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
