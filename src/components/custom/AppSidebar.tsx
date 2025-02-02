"use client";

import { useSnippetsContext } from "@/components/custom/SnippetsProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowDownUp, Filter } from "lucide-react";
import { useState } from "react";

export const AppSidebar: React.FC = (): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [sortOrder, setSortOrder] = useState("mostRecent");

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

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

  const sortedSnippets = [...snippets].sort((a, b) => {
    return sortOrder === "mostRecent"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const filteredSnippets = sortedSnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 || snippet.tags.some((tag) => selectedTags.includes(tag)))
  );

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
        <SidebarGroup className="flex flex-row">
          <SidebarGroupContent>
            <SidebarGroupLabel>Filter by Tags</SidebarGroupLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-1/2">
                  <Filter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuCheckboxItem checked={selectedTags.length === 0} onCheckedChange={(checked) => handleTagChange("all", checked)}>
                  All
                </DropdownMenuCheckboxItem>
                {uniqueTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => handleTagChange(tag, checked)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarGroupLabel>Sort by</SidebarGroupLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-1/2">
                  <ArrowDownUp />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="mostRecent">Most Recent</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Snippets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSnippets.map((snippet) => (
                <SidebarMenuItem key={snippet.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/snippets/${snippet.id}`}>{snippet.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
