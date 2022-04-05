import { ApolloServer, ApolloError } from "apollo-server-micro";
import cors from "micro-cors";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import { GraphQLSchema } from "graphql";
import * as Sentry from "@sentry/node";
import { createContext } from "../../server/graphql/ctx";
import { resolvers, typeDefs } from "../../server/graphql";
import { permissions } from "../../server/utils/auth/permissions";

const Cors = cors();

let schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

schema = applyMiddleware(schema, permissions);

export default Cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [
      {
        async requestDidStart(_): Promise<any> {
          // return type?
          return {
            didEncounterErrors(ctx) {
              if (!ctx.operation) {
                return;
              }

              for (const err of ctx.errors) {
                // Only report internal server errors,
                // all errors extending ApolloError should be user-facing
                if (err instanceof ApolloError) {
                  continue;
                }
                Sentry.withScope((scope) => {
                  scope.setTag("kind", ctx.operation.operation);
                  scope.setExtra("query", ctx.request.query);
                  scope.setExtra("variables", ctx.request.variables);

                  if (err.path) {
                    scope.addBreadcrumb({
                      category: "query-path",
                      message: err.path.join(" > "),
                      level: Sentry.Severity.Debug,
                    });
                  }

                  const transactionId =
                    ctx.request.http.headers.get("x-transaction-id");
                  if (transactionId) {
                    scope.setTransaction(transactionId);
                  }

                  Sentry.captureException(err);
                });
              }
            },
          };
        },
      },
    ],
  });

  Sentry.init({ dsn: process.env.SENTRY_DSN });

  await server.start();

  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
