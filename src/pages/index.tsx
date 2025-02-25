import React from "react";

import { loadSnippets } from "@/lib/snippet-storage";
import { saveSnippets } from "@/lib/snippet-storage";
import { Snippet } from "@/lib/types";
import { SnippetForm } from "@/components/snippet-form";
import { SnippetBrowser } from "@/components/snippet-browser";

export const Index: React.FC = () => {
  const [snippets, setSnippets] = React.useState<Array<Snippet>>([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  React.useEffect(() => {
    const savedSnippets = loadSnippets();
    setSnippets(savedSnippets);
  }, []);

  const handleSaveSnippet = (newSnippet: Snippet) => {
    const updatedSnippets = [...snippets, newSnippet];
    setSnippets(updatedSnippets);
    saveSnippets(updatedSnippets);
  };

  const handleDeleteSnippet = (id: string) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.id !== id));
    saveSnippets(snippets);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-2xl font-mono">Code Snippet Manager</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <SnippetForm onSave={handleSaveSnippet} />
            </div>
            <div>
              <SnippetBrowser
                snippets={snippets}
                onDelete={handleDeleteSnippet}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
