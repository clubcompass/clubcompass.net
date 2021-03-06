import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// import { setContext } from "@apollo/client/link/context";
// import Cookies from "js-cookie";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<any> | null = null;

// const authLink = setContext((_, { headers }) => {
//   if (typeof window === "undefined") {
//     console.log("running on ssr");
//     return {
//       headers,
//     };
//   }

//   const token = Cookies.get("token"); // cookies not visible on client

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        // switch (err.extensions.code) {
        //   // Apollo Server sets code to UNAUTHENTICATED
        //   // when an AuthenticationError is thrown in a resolver
        //   case 'UNAUTHENTICATED':

        //     // Modify the operation context with a new token
        //     const oldHeaders = operation.getContext().headers;
        //     operation.setContext({
        //       headers: {
        //         ...oldHeaders,
        //         authorization: getNewToken(),
        //       },
        //     });
        //     // Retry the request, returning the new observable
        //     return forward(operation);
        // }
      }
    }
    // use RetryLink to retry the request
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "same-origin",
});

const appLink = from([errorLink, httpLink]); // from([authLink, errorLink, httpLink]);

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: appLink,
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: appLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
