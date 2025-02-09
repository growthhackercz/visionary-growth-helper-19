
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

interface Note {
  id: string;
  title: string;
  subtitle?: string;
  date: Date;
}

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Vytvořit rozhraní které si bude tahat data z feedu a...",
      date: new Date("2024-02-06"),
    },
    {
      id: "2",
      title: "Kolik je v Bibli proroctví?",
      subtitle: "Kolik zázraků Ježíš udělal?",
      date: new Date("2024-02-04"),
    },
    {
      id: "3",
      title: "Co si připravit za přednášku?",
      subtitle: "Přednáška č. 76",
      date: new Date("2024-01-25"),
    },
  ]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return format(date, "d. MMMM", { locale: cs });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto w-full space-y-4 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Všechny poznámky</h1>
          <p className="text-muted-foreground">
            Poznámky ({notes.length})
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            className="pl-10 bg-muted/50"
            placeholder="Hledat poznámky"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <h2 className="font-medium">{note.title}</h2>
              {note.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {note.subtitle}
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                {formatDate(note.date)}
              </p>
            </Card>
          ))}
        </div>

        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg"
        >
          <PlusCircle className="w-6 h-6" />
        </Button>
      </div>
    </Layout>
  );
}
