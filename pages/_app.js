import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/auth";
import { Layout } from "../components/Layout";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  const { dashboardLayout, navigationLayout } = pageProps;
  const layout =
    navigationLayout === false
      ? "none"
      : dashboardLayout
      ? "dashboard"
      : "site";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout layout={layout}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
