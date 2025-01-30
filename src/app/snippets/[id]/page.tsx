"use client";

import { useParams } from "next/navigation";
import { useSnippetsContext } from "@/components/custom/SnippetsProvider";
import { Snippet } from "@/lib/entities/Snippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Page: React.FC = (): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();
  const { id } = useParams();
  const snippet: Snippet | undefined = snippets.find((snippet) => snippet.id === id);
  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return (
    <>
      <h1>{snippet.title}</h1>
      <SyntaxHighlighter language={snippet.language}>{snippet.content}</SyntaxHighlighter>
    </>
  );
};

export default Page;
