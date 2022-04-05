import "tailwindcss/tailwind.css";
import App from "next/app";
import type { AppProps as NextAppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApollo } from "../lib/apolloClient";
import { AuthProvider } from "../context/AuthProvider";
import { ToastProvider } from "../context/ToastProvider";
import { Layout } from "../components/Layout";
import { getUser } from "../lib/getUser";
import { AuthenticatedUser } from "../lib/getUser";

interface AppProps extends NextAppProps {
  user: AuthenticatedUser | null;
}

function ClubCompass({ Component, pageProps, user }: AppProps) {
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
          <AuthProvider user={user}>
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

ClubCompass.getInitialProps = async (app: any) => {
  const appProps = await App.getInitialProps(app);
  const cookies = app.ctx.req?.cookies;
  const user = cookies ? await getUser({ cookies }) : null;
  return { ...appProps, user };
};

export default ClubCompass;
