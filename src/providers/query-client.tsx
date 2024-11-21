"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderTanstack,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProviderTanstack client={queryClient}>
      {children}
    </QueryClientProviderTanstack>
  );
}
