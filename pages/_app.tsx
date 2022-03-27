import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApollo } from "../lib/apolloClient";
import { AuthProvider } from "../context/AuthProvider";
import { ToastProvider } from "../context/ToastProvider";
import { Layout } from "../components/Layout";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient(); // don't need
  const apolloClient = useApollo(pageProps);

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
        <ToastProvider>
          <AuthProvider protectedRoute={pageProps.protected}>
            <Layout layout={layout}>
              {/* Maybe Modal Provider should go into layout? */}
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
