import { type ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";
import { useMutation } from "convex/react";
import { api } from "$/_generated/api";

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  "PHP",
  "Swift",
  "Kotlin",
  "C#",
  "Scala",
  "Haskell",
  "Perl",
  "R",
  "MATLAB",
  "Dart",
  "Lua",
  "Shell",
];

export const NewSnippetSheet: React.FC = (): React.JSX.Element => {
  const createSnippet = useMutation(api.snippets.createSnippet);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [openCombobox, setOpenCombobox] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSnippet = {
      title,
      language,
      tags,
      description,
      content,
    };
    try {
      createSnippet(newSnippet);
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(`Error creating snippet: ${err}`);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setLanguage("");
    setDescription("");
    setTags([]);
    setCurrentTag("");
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const getLanguageForPrism = (lang: string) => {
    const lowercaseLang = lang.toLowerCase();
    if (languages[lowercaseLang]) {
      return lowercaseLang;
    }
    if (lowercaseLang === "c++" || lowercaseLang === "c#") {
      return "clike";
    }
    return "markup"; // fallback
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">New Snippet</Button>
      </SheetTrigger>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-x-auto">
        <SheetHeader>
          <SheetTitle>Create new snippet</SheetTitle>
          <SheetDescription>Add a new code snippet to your collection.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className="w-full justify-between">
                  {language ? language : "Select language..."}
                  <X
                    className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", language && "opacity-100")}
                    onClick={() => setLanguage("")}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {programmingLanguages.map((lang) => (
                        <CommandItem
                          key={lang}
                          onSelect={(currentValue) => {
                            setLanguage(currentValue === language ? "" : currentValue);
                            setOpenCombobox(false);
                          }}>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language === lang ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {lang}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="border rounded-md">
              <Editor
                value={content}
                onValueChange={(code) => setContent(code)}
                highlight={(code) =>
                  highlight(code, languages[getLanguageForPrism(language)], language)
                }
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  minHeight: "200px",
                  height: "100%",
                  overflow: "auto",
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex space-x-2">
              <Input
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
              />
              <Button type="button" onClick={addTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save Snippet</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
