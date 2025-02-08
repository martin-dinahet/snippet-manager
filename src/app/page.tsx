"use client";

import { api } from "$/_generated/api";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import * as React from "react";

const Page: React.FC = () => {
  const createSnippet = useMutation(api.snippets.createSnippet);

  return (
    <>
      <div className="flex p-4">
        <Button
          variant="secondary"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            createSnippet({
              title: "Test snippet",
              description: "A test snippet.",
              language: "typescript",
              tags: ["test", "typescript"],
              content: "const a = 5;",
            });
          }}>
          Create snippet
        </Button>
      </div>
    </>
  );
};

export default Page;
