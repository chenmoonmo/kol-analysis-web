"use client";

import { Theme } from "@radix-ui/themes";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark">
      <Theme>{children}</Theme>
    </NextThemeProvider>
  );
};

export default ThemeProvider;
