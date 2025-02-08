"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "$/_generated/api";
import { Id } from "$/_generated/dataModel";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

const Page: React.FC = (): React.JSX.Element => {
  const { id } = useParams();
  const snippet = useQuery(api.snippets.getSnippet, id ? { id: id as Id<"snippets"> } : "skip");

  const getLanguageForPrism = (lang: string) => {
    const lowercaseLang = lang.toLowerCase();
    if (languages[lowercaseLang]) {
      return lowercaseLang;
    }
    if (lowercaseLang === "c++" || lowercaseLang === "c#") {
      return "clike";
    }
    return "markup"; // fallback
  };

  if (snippet === undefined) {
    return <div>Loading...</div>;
  }

  if (snippet === null) {
    return <div>Snippet not found</div>;
  }

  return (
    <>
      <h1>{snippet.title}</h1>
      <Editor
        value={snippet.content}
        onValueChange={(code) => {
          snippet.content = code;
        }}
        highlight={(code) =>
          highlight(code, languages[getLanguageForPrism(snippet.language)], snippet.language)
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          minHeight: "200px",
          height: "100%",
          overflow: "auto",
        }}
      />
    </>
  );
};

export default Page;
