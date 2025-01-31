"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { BreadcrumbList } from "@/components/ui/breadcrumb";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useSnippetsContext } from "@/components/custom/SnippetsProvider";
import { useParams, usePathname } from "next/navigation";
import { Snippet } from "@/lib/entities/Snippet";

interface Props {
  children?: React.ReactNode;
}

export const AppHeader: React.FC<Props> = ({ children }: Props): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();
  const { id } = useParams();
  const snippet: Snippet | undefined = snippets.find((snippet) => snippet.id === id);

  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const generateBreadcrumbs = () => {
    if (!pathname.startsWith("/snippets")) {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </>
      );
    }
    if (paths.length >= 2) {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/snippets">Snippets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">
              {snippet ? snippet.title : "Snippet not found"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    }
    return (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Snippets</BreadcrumbPage>
        </BreadcrumbItem>
      </>
    );
  };

  return (
    <>
      <header className="w-full h-fit p-3 border-b bg-gray-50 flex gap-3 items-center">
        {children}
        <Breadcrumb>
          <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
        </Breadcrumb>
      </header>
    </>
  );
};
