
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <Input
                  value={entries[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`${index + 1}. věc, za kterou jsem dnes vděčný/á...`}
                  className="bg-secondary/50 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Uložit dnešní vděčnost?</AlertDialogTitle>
            <AlertDialogDescription>
              Chcete uložit všechny tři záznamy vaší dnešní vděčnosti?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction onClick={() => saveGratitudeMutation.mutate()}>
              Uložit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
