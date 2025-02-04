"use client";

import { useSnippetsContext } from "@/components/custom/SnippetsProvider";
import { useParams } from "next/navigation";
import { AppBreadcrumbs } from "@/components/custom/AppBreadcrumbs";
import { NewSnippetSheet } from "@/components/custom/NewSnippetSheet";

interface Props {
  children?: React.ReactNode;
}

export const AppHeader: React.FC<Props> = ({ children }: Props): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();
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
