"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar";
import { SidebarGroup } from "@/components/ui/sidebar";
import { SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import { SidebarHeader } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useSnippetsContext } from "@/components/custom/SnippetsProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const AppSidebar: React.FC = (): React.JSX.Element => {
  const { snippets, uniqueTags, error, loading } = useSnippetsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

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

  const filteredSnippets = snippets.filter(
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
        <SidebarGroup>
          <SidebarGroupLabel>Filter by Tags</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all"
                  checked={selectedTags.length === 0}
                  onCheckedChange={(checked) => handleTagChange("all", checked as boolean)}
                />
                <Label
                  htmlFor="all"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  All
                </Label>
              </div>
              {uniqueTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                  />
                  <Label
                    htmlFor={tag}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
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
