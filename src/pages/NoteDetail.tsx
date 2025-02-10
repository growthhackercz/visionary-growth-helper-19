
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  date: string;
}

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNewNote = id === 'new';

  const [note, setNote] = useState<Partial<Note>>({
    title: '',
    subtitle: '',
    content: ''
  });

  const { isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      if (isNewNote) return null;

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching note:", error);
        return null;
      }

      setNote(data);
      return data;
    },
    enabled: !isNewNote
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const noteData = {
        ...note,
        user_id: user.id,
      };

      const { data, error } = isNewNote
        ? await supabase.from('notes').insert([noteData]).select().single()
        : await supabase.from('notes').update(noteData).eq('id', id).select().single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(isNewNote ? "Poznámka byla vytvořena" : "Poznámka byla uložena");
      navigate('/notes');
    },
    onError: (error) => {
      console.error("Error saving note:", error);
      toast.error("Nepodařilo se uložit poznámku");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (isNewNote) return;
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("Poznámka byla smazána");
      navigate('/notes');
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast.error("Nepodařilo se smazat poznámku");
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto w-full space-y-4">
        <Card className="p-6 space-y-4">
          <Input
            placeholder="Nadpis poznámky"
            value={note.title}
            onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
            className="text-lg font-medium"
          />
          <Input
            placeholder="Podnadpis (volitelné)"
            value={note.subtitle}
            onChange={(e) => setNote(prev => ({ ...prev, subtitle: e.target.value }))}
            className="text-muted-foreground"
          />
          <Textarea
            placeholder="Obsah poznámky..."
            value={note.content}
            onChange={(e) => setNote(prev => ({ ...prev, content: e.target.value }))}
            className="min-h-[300px]"
          />
          <div className="flex justify-between">
            <div className="space-x-2">
              <Button onClick={() => navigate('/notes')} variant="outline">
                Zrušit
              </Button>
              {!isNewNote && (
                <Button 
                  onClick={() => deleteMutation.mutate()}
                  variant="destructive"
                >
                  Smazat
                </Button>
              )}
            </div>
            <Button onClick={() => saveMutation.mutate()}>
              {isNewNote ? "Vytvořit" : "Uložit"}
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
