import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import cors from "micro-cors";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import { GraphQLResolveInfo, GraphQLSchema } from "graphql";
import { createContext, Context } from "../../server/graphql/ctx";
import { resolvers, typeDefs } from "../../server/graphql";
import { permissions } from "../../server/utils/auth/permissions";

const Cors = cors();

let schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

// const isAuthenticated = rule({ cache: "contextual" })(
//   async (parent, args, { auth, prisma }, info) => {
//     console.log(auth);
//     return false;
//   }
// );

// const permissions = shield({
//   Query: {
//     getUser: isAuthenticated,
//   },
// });

schema = applyMiddleware(schema, permissions);

export default Cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const server = new ApolloServer({
    schema,
    context: createContext,
  });

  await server.start();

  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
