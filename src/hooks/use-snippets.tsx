"use client";

import { Snippet } from "@/lib/entities/Snippet";
import { useState, useEffect } from "react";

export const useSnippets = () => {
  const [snippets, setSnippets] = useState<Array<Snippet>>([]);
  const [uniqueTags, setUniqueTags] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("/api/snippets");
        if (!response.ok) {
          throw new Error("Failed to fetch snippets");
        }
        const data: Array<Snippet> = await response.json();
        setSnippets(data);
        const allTags = data.flatMap((snippet: Snippet) => snippet.tags);
        const uniqueTagsSet = new Set(allTags);
        setUniqueTags(Array.from(uniqueTagsSet));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch snippets");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return { snippets, uniqueTags, error, loading };
};
