import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { AuthProvider } from "../context/AuthProvider";
import { ToastProvider } from "../context/ToastProvider";
import { Layout } from "../components/Layout";
function MyApp({ Component, pageProps }) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => console.log(message));
    }

    if (networkError) {
      // global handler for graphql errors
      console.log(networkError);
    }
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get("token"); // change to token
    // console.log("token from root", token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });

  const appLink = from([errorLink, authLink, httpLink]);

  const apolloClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
    credentials: "include",
  });

  const queryClient = new QueryClient();

  const { dashboardLayout, navigationLayout } = pageProps;
  const layout =
    navigationLayout === false
      ? "none"
      : dashboardLayout
      ? "dashboard"
      : "site";

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        {/* Dont need Apollo Query Provider */}
        {/* <ToastProvider> */}
        <AuthProvider protectedRoute={pageProps.protected}>
          <Layout layout={layout}>
            {/* Maybe Modal Provider should go into layout? */}
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
        {/* </ToastProvider> */}
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
