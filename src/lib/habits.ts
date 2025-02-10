
import { Heart, User, Briefcase, Book, Compass } from "lucide-react";
import { ReactNode } from "react";

export const categoryIcons: Record<string, ReactNode> = {
  "Health": <Heart className="w-4 h-4" />,
  "Personal": <User className="w-4 h-4" />,
  "Work": <Briefcase className="w-4 h-4" />,
  "Learning": <Book className="w-4 h-4" />,
  "Spiritual": <Compass className="w-4 h-4" />
};

export const frequencies = [
  { value: "daily", label: "Každý den" },
  { value: "weekly", label: "Každý týden" },
  { value: "monthly", label: "Každý měsíc" },
];
