import Cookies from "js-cookie";

import { Snippet } from "@/lib/types";

export const saveSnippets = (snippets: Array<Snippet>): void => {
  Cookies.set("snippets", JSON.stringify(snippets), { expires: 365 });
};

export const loadSnippets = (): Array<Snippet> => {
  const snippetsJSON = Cookies.get("snippets");
  return snippetsJSON ? JSON.parse(snippetsJSON) : [];
};
