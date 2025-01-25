"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileIcon, FolderIcon } from "lucide-react";
import { useState } from "react";

const Page: React.FC = (): React.JSX.Element => {
  const [selectedFolder, setSelectedFolder] = useState(0);

  const folders = [
    {
      name: "Folder 1",
      snippets: [
        { title: "Snippet 1", language: "JavaScript", description: "A basic JS snippet", content: 'console.log("Hello, world!");' },
        { title: "Snippet 2", language: "Python", description: "A basic Python snippet", content: 'print("Hello, world!")' },
        { title: "Snippet 3", language: "Java", description: "A basic Java snippet", content: 'System.out.println("Hello, world!");' },
      ],
    },
    {
      name: "Folder 2",
      snippets: [
        { title: "Snippet 4", language: "Ruby", description: "A basic Ruby snippet", content: 'puts "Hello, world!"' },
        { title: "Snippet 5", language: "Go", description: "A basic Go snippet", content: 'fmt.Println("Hello, world!")' },
        { title: "Snippet 6", language: "C", description: "A basic C snippet", content: 'printf("Hello, world!");' },
      ],
    },
    {
      name: "Folder 3",
      snippets: [
        { title: "Snippet 7", language: "PHP", description: "A basic PHP snippet", content: 'echo "Hello, world!";' },
        { title: "Snippet 8", language: "Swift", description: "A basic Swift snippet", content: 'print("Hello, world!")' },
        { title: "Snippet 9", language: "TypeScript", description: "A basic TypeScript snippet", content: 'console.log("Hello, world!");' },
      ],
    },
  ];

  return (
    <Card className="h-full min-h-screen max-w-md">
      <CardContent>
        <div className="flex">
          <div className="w-1/4 border-r mr-4">
            {folders.map((folder, i) => (
              <div
                key={i}
                className={`flex flex-col items-center p-2 ${selectedFolder === i ? "bg-gray-100" : ""}`}
                onClick={() => setSelectedFolder(i)}
              >
                <FolderIcon className="w-5 h-5 mr-2" />
                <span>{folder.name}</span>
              </div>
            ))}
          </div>
          <div className="w-3/4 pl-4 space-y-2">
            {folders[selectedFolder].snippets.map((snippet, i) => (
              <div key={i} className="flex justify-between items-center border-b py-2">
                <div className="flex flex-col items-center w-1/3">
                  <FileIcon className="w-5 h-5" />
                  <span>{snippet.language}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-2/3">
                  <span className="mb-1 text-center">{snippet.title}</span>
                  <span className="text-sm text-gray-500 text-center">{snippet.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
