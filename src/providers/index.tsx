
import ThemeProvider from "./theme";
import QueryClientProvider from "./query-client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
