import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/auth";
import { Layout } from "../components/Layout";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
