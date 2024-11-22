import ThemeProvider from "./theme";
import QueryClientProvider from "./query-client";
import { Suspense } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <QueryClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default Providers;
