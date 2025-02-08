"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar";
import { SidebarGroup } from "@/components/ui/sidebar";
import { SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import { SidebarHeader } from "@/components/ui/sidebar";
import { ArrowDownWideNarrow } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { Tag } from "lucide-react";
import { useState } from "react";
import { Collapsible } from "../ui/collapsible";
import { CollapsibleContent } from "../ui/collapsible";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "$/_generated/api";

export const AppSidebar: React.FC = () => {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [sortOrder, setSortOrder] = useState("mostRecent");

  const uniqueTags =
    snippets && Array.isArray(snippets)
      ? Array.from(new Set(snippets.map((snippet: { tags: string[] }) => snippet.tags).flat()))
      : [];

  const handleTagChange = (tag: string, checked: boolean) => {
    setSelectedTags((prev) => {
      if (tag === "all") {
        return checked ? uniqueTags : [];
      }
      if (checked) {
        return [...prev, tag];
      }
      return prev.filter((t) => t !== tag);
    });
  };

  const sortedSnippets = (snippets && Array.isArray(snippets) ? [...snippets] : []).sort((a, b) => {
    return sortOrder === "mostRecent"
      ? new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime()
      : new Date(a._creationTime).getTime() - new Date(b._creationTime).getTime();
  });

  const filteredSnippets = sortedSnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 || snippet.tags.some((tag: string) => selectedTags.includes(tag)))
  );

  const getSnippetAccentColor = (snippet: any) => {
    switch (snippet.language) {
      case "javascript":
        return "bg-yellow-500";
      case "typescript":
        return "bg-blue-500";
      case "html":
        return "bg-red-500";
      case "css":
        return "bg-purple-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <h2 className="px-4 py-2 text-xl font-semibold">Snippets App</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              type="text"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Search Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full font-semibold flex justify-between">
                  <div className="flex justify-start items-center gap-3">
                    <Tag /> Filter by tag
                  </div>
                  <ChevronsUpDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mb-4">
                <div className="flex p-2 pl-6 gap-3 items-center">
                  <Checkbox
                    checked={selectedTags.length === 0}
                    onCheckedChange={(checked: boolean) => handleTagChange("all", checked)}
                  />
                  All
                </div>
                {uniqueTags.map((tag, key) => (
                  <div key={key} className="flex pl-6 gap-3 items-center">
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked: boolean) => handleTagChange(tag, checked)}
                    />
                    {tag}
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full font-semibold flex justify-between">
                  <div className="flex justify-start items-center gap-3">
                    <ArrowDownWideNarrow />
                    Sort
                  </div>
                  <ChevronsUpDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <RadioGroup
                  value={sortOrder}
                  onValueChange={setSortOrder}
                  className="p-3 pl-6 gap-3">
                  <div className="flex gap-3">
                    <RadioGroupItem value="mostRecent" />
                    <Label htmlFor="mostRecent">Most Recent</Label>
                  </div>
                  <div className="flex gap-3">
                    <RadioGroupItem value="oldest" />
                    <Label htmlFor="oldest">Oldest</Label>
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Snippets</SidebarGroupLabel>
          <SidebarGroupContent>
            {filteredSnippets.map((snippet) => (
              <div
                key={snippet._id}
                className="p-2 pl-6 flex flex-col gap-1 rounded-md hover:bg-sidebar-accent">
                <a
                  href={`/snippets/${snippet._id}`}
                  className="font-bold flex items-center gap-2 justify-between">
                  {snippet.title}
                  <div
                    className={cn(
                      "w-[7px] h-[7px] rounded-full",
                      getSnippetAccentColor(snippet)
                    )}></div>
                </a>
                <div className="flex gap-1">
                  {snippet.tags.map((tag: string, key: number) => (
                    <Badge
                      key={key}
                      className="w-fit text-[0.6rem] py-[0.01rem] h-fit bg-gray-200 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
