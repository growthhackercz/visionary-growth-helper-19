
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

interface GratitudeEntry {
  id: string;
  entry_date: string;
  entry_1: string | null;
  entry_2: string | null;
  entry_3: string | null;
}

const Gratitude = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [entries, setEntries] = useState<[string, string, string]>(["", "", ""]);
  const [streak, setStreak] = useState(0);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Fetch streak
  const fetchStreak = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    
    const { data, error } = await supabase.rpc('get_gratitude_streak', {
      user_uuid: user.id
    });
    
    if (error) throw error;
    return data;
  };

  // Fetch today's entries if they exist
  const fetchTodayEntries = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('gratitude_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('entry_date', new Date().toISOString().split('T')[0])
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  };

  // Fetch history
  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('gratitude_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('entry_date', { ascending: false })
      .limit(7);

    if (error) throw error;
    return data;
  };

  const { data: streakData } = useQuery({
    queryKey: ['gratitudeStreak'],
    queryFn: fetchStreak
  });

  const { data: todayEntries } = useQuery({
    queryKey: ['todayGratitude'],
    queryFn: fetchTodayEntries
  });

  const { data: historyData } = useQuery({
    queryKey: ['gratitudeHistory'],
    queryFn: fetchHistory
  });

  useEffect(() => {
    if (streakData !== undefined) {
      setStreak(streakData);
    }
    if (todayEntries) {
      setEntries([
        todayEntries.entry_1 || "",
        todayEntries.entry_2 || "",
        todayEntries.entry_3 || ""
      ]);
    }
  }, [streakData, todayEntries]);

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
    }
  });

  const handleInputChange = (index: number, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries as [string, string, string]);

    // If all entries are filled, show confirmation dialog
    if (newEntries.every(entry => entry.trim() !== "")) {
      setShowSaveDialog(true);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Flow lístek</h1>
          <p className="text-lg text-white/80">Váš deník vděčnosti</p>
        </section>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-white">{streak} dní v řadě</span>
          </div>
        </div>

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

        {historyData && historyData.length > 0 && (
          <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Historie vděčnosti</h2>
            <div className="space-y-4">
              {historyData.map((entry: GratitudeEntry) => (
                <div key={entry.id} className="p-4 rounded-lg bg-secondary/30">
                  <div className="text-sm text-white/60 mb-2">
                    {new Date(entry.entry_date).toLocaleDateString('cs-CZ')}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    {entry.entry_1 && <li>{entry.entry_1}</li>}
                    {entry.entry_2 && <li>{entry.entry_2}</li>}
                    {entry.entry_3 && <li>{entry.entry_3}</li>}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}

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
      </div>
    </Layout>
  );
};

export default Gratitude;
