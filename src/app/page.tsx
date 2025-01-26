"use client";

import { Sidebar, SidebarHeader} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useState } from "react";


const Page: React.FC = (): React.JSX.Element => {
  const [query, setQuery] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const snippets = [
        { title: "Snippet 1", language: "JavaScript", description: "A basic JS snippet", content: 'console.log("Hello, world!");' },
        { title: "Snippet 2", language: "Python", description: "A basic Python snippet", content: 'print("Hello, world!")' },
        { title: "Snippet 3", language: "Java", description: "A basic Java snippet", content: 'System.out.println("Hello, world!");' },
        { title: "Snippet 4", language: "Ruby", description: "A basic Ruby snippet", content: 'puts "Hello, world!"' },
        { title: "Snippet 5", language: "Go", description: "A basic Go snippet", content: 'fmt.Println("Hello, world!")' },
        { title: "Snippet 6", language: "C", description: "A basic C snippet", content: 'printf("Hello, world!");' },
        { title: "Snippet 7", language: "PHP", description: "A basic PHP snippet", content: 'echo "Hello, world!";' },
        { title: "Snippet 8", language: "Swift", description: "A basic Swift snippet", content: 'print("Hello, world!")' },
        { title: "Snippet 9", language: "TypeScript", description: "A basic TypeScript snippet", content: 'console.log("Hello, world!");' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-2">
      <Input 
        type="text"
        placeholder={"Search"}
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 "
      />
      <DropdownMenu></DropdownMenu>
      </SidebarHeader>
    </Sidebar>
  );
};

export default Page;
