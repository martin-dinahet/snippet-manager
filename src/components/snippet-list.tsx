import React from "react";
import CodeMirror from "@uiw/react-codemirror";

import { Snippet } from "@/lib/types";
import { Extension } from "@uiw/react-codemirror";
import { LanguageName } from "@uiw/codemirror-extensions-langs";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

interface Props {
  snippets: Array<Snippet>;
  onDelete: (id: string) => void;
}

export const SnippetList: React.FC<Props> = ({ snippets, onDelete }) => {
  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="bg-white p-6 ">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium font-mono">{snippet.title}</h3>
            </div>
            <button
              onClick={() => onDelete(snippet.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
          <div className="relative">
            <div className="absolute top-2 right-2 flex items-center space-x-2 z-10">
              <span className="text-sm text-gray-500">{snippet.language}</span>
            </div>
            <div className="border overflow-hidden">
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
          </div>
        </div>
      ))}
    </div>
  );
};
