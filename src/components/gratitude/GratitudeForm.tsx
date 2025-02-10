
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GratitudeFormInputs } from "./GratitudeFormInputs";
import { GratitudeSaveDialog } from "./GratitudeSaveDialog";

interface GratitudeFormProps {
  initialEntries?: [string, string, string];
}

export const GratitudeForm = ({ initialEntries = ["", "", ""] }: GratitudeFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [entries, setEntries] = useState<[string, string, string]>(initialEntries);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const saveGratitudeMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('gratitude_entries')
        .upsert({
          user_id: user.id,
          entry_date: new Date().toISOString().split('T')[0],
          entry_1: entries[0],
          entry_2: entries[1],
          entry_3: entries[2]
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gratitudeStreak'] });
      queryClient.invalidateQueries({ queryKey: ['gratitudeHistory'] });
      toast({
        title: "Uloženo!",
        description: "Vaše vděčnost byla úspěšně uložena.",
      });
      setShowSaveDialog(false);
    },
    onError: (error) => {
      toast({
        title: "Chyba!",
        description: "Nepodařilo se uložit vaši vděčnost. Zkuste to prosím znovu.",
        variant: "destructive",
      });
      console.error("Error saving gratitude:", error);
    }
  });

  const handleInputChange = (index: number, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries as [string, string, string]);

    if (newEntries.every(entry => entry.trim() !== "")) {
      setShowSaveDialog(true);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Dnešní vděčnost</h2>
          <GratitudeFormInputs entries={entries} onInputChange={handleInputChange} />
        </div>
      </Card>

      <GratitudeSaveDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        onSave={() => saveGratitudeMutation.mutate()}
      />
    </>
  );
};
