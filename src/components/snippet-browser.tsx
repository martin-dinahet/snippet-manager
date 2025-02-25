import React from "react";

import { Snippet } from "@/lib/types";
import { SnippetCard } from "./snippet-card";

interface Props {
  snippets: Array<Snippet>;
  onDelete: (id: string) => void;
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SnippetBrowser: React.FC<Props> = ({
  snippets,
  onDelete,
  selectedLanguage,
  setSelectedLanguage,
  searchQuery,
  setSearchQuery,
}) => {
  const languages = Array.from(new Set(snippets.map((s) => s.language)));

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;
    const matchesSearch =
      !searchQuery ||
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white border p-4 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-4 p-2 border font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() =>
                setSelectedLanguage(selectedLanguage === lang ? null : lang)
              }
              className={`px-3 py-1 border font-mono text-sm ${
                selectedLanguage === lang ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSnippets.length === 0 ? (
          <div className="border bg-white p-4 space-y-3">
            <p className="font-mono">No snippets found</p>
          </div>
        ) : (
          filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
