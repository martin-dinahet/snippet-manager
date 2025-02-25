import React from "react";
import CodeMirror from "@uiw/react-codemirror";

import { Snippet } from "@/lib/types";
import { Extension } from "@uiw/react-codemirror";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

interface Props {
  snippet: Snippet;
  onDelete: (id: string) => void;
}

export const SnippetCard: React.FC<Props> = ({ snippet, onDelete }) => {
  return (
    <>
      <div className="border bg-white p-4 space-y-3">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-mono">{snippet.title}</h3>
            <p className="text-sm text-gray-500 font-mono">
              {snippet.language}
            </p>
          </div>
        </div>
        <div className="border">
          <CodeMirror
            value={snippet.code}
            height="auto"
            theme="light"
            extensions={[
              loadLanguage(snippet.language as LanguageName) as Extension,
            ]}
            editable={false}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: false,
              highlightActiveLine: false,
            }}
          />
        </div>
        <button
          onClick={() => onDelete(snippet.id)}
          className="px-2 py-1 border"
        >
          Delete
        </button>
      </div>
    </>
  );
};
