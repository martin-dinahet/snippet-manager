"use client";

import { useSnippets } from "@/hooks/use-snippets";
import { useContext } from "react";
import { createContext } from "react";

export const SnippetsContext = createContext<ReturnType<typeof useSnippets> | null>(null);

export function SnippetsProvider({ children }: { children: React.ReactNode }) {
  const snippetsData = useSnippets();

  return <SnippetsContext.Provider value={snippetsData}>{children}</SnippetsContext.Provider>;
}

export const useSnippetsContext = () => {
  const context = useContext(SnippetsContext);
  if (context === null) {
    throw new Error("useSnippetsContext must be used within a SnippetsProvider");
  }
  return context;
};
