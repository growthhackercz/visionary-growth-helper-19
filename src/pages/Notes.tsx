
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { CardSkeleton } from "@/components/ui/loading-skeleton";

interface Note {
  id: string;
  title: string;
  subtitle?: string;
  date: Date;
}

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error("Error fetching notes:", error);
        return [];
      }

      return notes.map(note => ({
        ...note,
        date: new Date(note.date)
      }));
    }
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return format(date, "d. MMMM", { locale: cs });
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Nápady" }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="content-container-sm animate-fade-in">
          <PageHeader
            title="Všechny poznámky"
            description="Poznámky a nápady"
            breadcrumbs={breadcrumbs}
          />
          <CardSkeleton count={5} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="content-container-sm space-y-6 animate-fade-in">
        <PageHeader
          title="Všechny poznámky"
          description={`Poznámky (${notes.length})`}
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="gradient"
              onClick={() => navigate('/notes/new')}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Nová poznámka
            </Button>
          }
        />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground icon-sm" />
          <Input
            variant="glass"
            className="pl-10"
            placeholder="Hledat poznámky"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredNotes.length === 0 ? (
          <Card variant="glass" className="p-8 text-center">
            <PlusCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Žádné poznámky</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Nebyly nalezeny žádné poznámky odpovídající vašemu hledání." : "Začněte vytvořením své první poznámky."}
            </p>
            <Button
              variant="gradient"
              onClick={() => navigate('/notes/new')}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Vytvořit poznámku
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                variant="interactive"
                className="p-4 cursor-pointer"
                onClick={() => navigate(`/notes/${note.id}`)}
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
        )}

        <Button
          variant="gradient"
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg"
          onClick={() => navigate('/notes/new')}
        >
          <PlusCircle className="icon-lg" />
        </Button>
      </div>
    </Layout>
  );
}
