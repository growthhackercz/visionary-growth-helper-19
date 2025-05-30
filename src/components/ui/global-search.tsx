
import React, { useState, useEffect } from "react";
import { Search, FileText, CheckSquare, ListTodo, Heart, Brain } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: 'page' | 'feature' | 'action';
  icon: React.ComponentType<any>;
  href: string;
  keywords: string[];
}

const searchItems: SearchItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Hlavní přehled',
    type: 'page',
    icon: Brain,
    href: '/',
    keywords: ['dashboard', 'přehled', 'hlavní']
  },
  {
    id: 'habits',
    title: 'Buzer lístek',
    description: 'Správa návyků',
    type: 'page',
    icon: CheckSquare,
    href: '/habits',
    keywords: ['návyky', 'habits', 'buzer']
  },
  {
    id: 'todos',
    title: 'To-Do-All',
    description: 'Seznam úkolů',
    type: 'page',
    icon: ListTodo,
    href: '/todos',
    keywords: ['úkoly', 'todo', 'seznam']
  },
  {
    id: 'notes',
    title: 'Nápady',
    description: 'Poznámky a nápady',
    type: 'page',
    icon: FileText,
    href: '/notes',
    keywords: ['poznámky', 'nápady', 'notes']
  },
  {
    id: 'gratitude',
    title: 'Flow lístek',
    description: 'Deník vděčnosti',
    type: 'page',
    icon: Heart,
    href: '/gratitude',
    keywords: ['vděčnost', 'gratitude', 'flow']
  },
];

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Hledat...
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Hledat..." />
        <CommandList>
          <CommandEmpty>Žádné výsledky.</CommandEmpty>
          <CommandGroup heading="Stránky">
            {searchItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
