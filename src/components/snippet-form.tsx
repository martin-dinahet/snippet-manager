import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import { Extension } from "@uiw/react-codemirror";
import { Snippet } from "@/lib/types";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { LanguageName } from "@uiw/codemirror-extensions-langs";

interface Props {
  onSave: (snippet: Snippet) => void;
}

export const SnippetForm: React.FC<Props> = ({ onSave }) => {
  const [title, setTitle] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [language, setLanguage] = React.useState<LanguageName>("javascript");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      title: title,
      code: code,
      language: language,
    } as Snippet);
    setTitle("");
    setCode("");
    setLanguage("javascript");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border">
      <div>
        <label htmlFor="title" className="block text-sm font-medium font-mono">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border "
          required
        />
      </div>
      <div>
        <label
          htmlFor="language"
          className="block text-sm font-medium font-mono"
        >
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageName)}
          className="mt-1 block w-full border font-mono"
        >
          <option className="font-mono" value="javascript">
            JavaScript
          </option>
          <option className="font-mono" value="typescript">
            TypeScript
          </option>
          <option className="font-mono" value="jsx">
            JSX
          </option>
          <option className="font-mono" value="tsx">
            TSX
          </option>
          <option className="font-mono" value="html">
            HTML
          </option>
          <option className="font-mono" value="css">
            CSS
          </option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium font-mono">Code</label>
        <div className="border overflow-hidden">
          <CodeMirror
            value={code}
            height="200px"
            theme="light"
            extensions={[loadLanguage(language) as Extension]}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex border px-3 py-1 hover:bg-gray-100 font-mono"
      >
        Add Snippet
      </button>
    </form>
  );
};
