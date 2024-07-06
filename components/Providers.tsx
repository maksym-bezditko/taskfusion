"use client";

import { theme } from "@/theme";
import { ThemeProvider } from "styled-components";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
