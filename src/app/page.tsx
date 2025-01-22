"use client";

import { Snippet } from "@/lib/entities/Snippet";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Page: React.FC = (): React.JSX.Element => {
  const [snippets, setSnippets] = useState<Array<Snippet>>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("/api/snippets");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error(`Error fetching snippets: ${error}`);
        setSnippets([]);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <>
      <main className="w-screen min-h-screen grid place-items-center">
        {snippets.length >= 1 && (
          <ul className="flex flex-col gap-2">
            {snippets.map((snippet) => (
              <li key={snippet.id} className="bg-gray-100 p-3 border rounded-md">
                <Plus />
                <p>{snippet.title}</p>
                <p>{snippet.description}</p>
                <p>{snippet.content}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default Page;
