"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, Filter } from "lucide-react";
import { useState } from "react";

const Page: React.FC = (): React.JSX.Element => {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState("up");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  type Checked = DropdownMenuCheckboxItemProps["checked"];

  const snippets = [
    { title: "Snippet 1", language: "JavaScript", description: "A basic JS snippet", categories: "Front" },
    { title: "Snippet 2", language: "Python", description: "A basic Python snippet", categories: "Front" },
    { title: "Snippet 3", language: "Java", description: "A basic Java snippet", categories: "Front" },
    { title: "Snippet 4", language: "Ruby", description: "A basic Ruby snippet", categories: "Back" },
    { title: "Snippet 5", language: "Go", description: "A basic Go snippet", categories: "Back" },
    { title: "Snippet 6", language: "C", description: "A basic C snippet", categories: "Back" },
    { title: "Snippet 7", language: "PHP", description: "A basic PHP snippet", categories: "Memo" },
    { title: "Snippet 8", language: "Swift", description: "A basic Swift snippet", categories: "Cheat" },
    { title: "Snippet 9", language: "TypeScript", description: "A basic TypeScript snippet", categories: "Start" },
  ];

  const uniqueCategories = Array.from(new Set(snippets.map((snippet) => snippet.categories)));

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-2 flex">
        <Input type="text" placeholder={"Search"} value={query} onChange={handleInputChange} className="w-full p-2 " />
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Filter />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              {uniqueCategories.map((category) => (
                <DropdownMenuCheckboxItem key={category}>{category}</DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="justify-end">
                <ArrowUpDown />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="up">croissant</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="down">décroissant</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
    </Sidebar>
  );
};

export default Page;
