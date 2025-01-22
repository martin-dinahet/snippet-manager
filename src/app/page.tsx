"use client";

import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Page: React.FC = (): React.JSX.Element => {
  const [snippets, setSnippets] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("/api/snippets");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error(`Error fetching snippets: ${error}`);
        setSnippets(["Error fetching snippets"]);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <>
      <main className="w-screen min-h-screen grid place-items-center">
        <ul className="flex flex-col gap-2">
          {snippets.map((snippet) => (
            <>
              <li>
                Plus
                <span>{snippet}</span>
              </li>
              <Separator />
            </>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Page;
