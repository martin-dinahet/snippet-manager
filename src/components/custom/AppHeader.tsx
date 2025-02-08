"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { NewSnippetSheet } from "@/components/custom/NewSnippetSheet";
import { useQuery } from "convex/react";
import { api } from "$/_generated/api";
import { AppBreadcrumbs } from "@/components/custom/AppBreadcrumbs";

export const AppHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const snippets = useQuery(api.snippets.getSnippets);
  const { id } = useParams();

  return (
    <>
      <header className="h-fit p-3 border-b bg-gray-50 flex gap-3 items-center justify-between sticky top-0">
        <div className="flex gap-3 items-center">
          {children}
          <AppBreadcrumbs />
        </div>
        <NewSnippetSheet />
      </header>
    </>
  );
};
