
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, isValid } from "date-fns";
import { cs } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";

// Emotions based on NVC (Nonviolent Communication)
const emotions = {
  "Příjemné pocity": [
    "radostný", "vděčný", "nadšený", "spokojený", "klidný",
    "energický", "inspirovaný", "milující", "optimistický"
  ],
  "Nepříjemné pocity": [
    "smutný", "frustrovaný", "úzkostný", "unavený", "naštvaný",
    "osamělý", "přetížený", "zklamaný", "nejistý"
  ]
};

// Needs based on NVC
const needs = [
  "bezpečí", "odpočinek", "porozumění", "podpora",
  "růst", "spojení", "autonomie", "smysl",
  "ocenění", "kreativita", "harmonie"
];

interface MoodData {
  date: string;
  mood_type: string;
  need_type: string | null;
  notes: string | null;
}

export const MoodTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedNeed, setSelectedNeed] = useState("");
  const [notes, setNotes] = useState("");
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchMoodData();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchMoodData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchMoodData = async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: true });

    if (error) {
      toast.error("Nepodařilo se načíst data o náladách");
      return;
    }

    setMoodData(data || []);
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast.error("Nejste přihlášen/a");
      return;
    }

    if (!selectedMood) {
      toast.error("Prosím vyberte náladu");
      return;
    }

    const { error } = await supabase
      .from('moods')
      .insert({
        user_id: session.user.id,
        mood_type: selectedMood,
        need_type: selectedNeed || null,
        notes: notes || null,
      });

    if (error) {
      if (error.code === '23505') {
        toast.error("Pro dnešní den už máte záznam");
      } else {
        toast.error("Nepodařilo se uložit náladu");
      }
      return;
    }

    toast.success("Nálada byla uložena");
    setIsOpen(false);
    setSelectedMood("");
    setSelectedNeed("");
    setNotes("");
    fetchMoodData();
  };

  const safeChartData = moodData.filter(item => {
    try {
      // Validate that this is a proper date
      const date = new Date(item.date);
      return isValid(date);
    } catch (e) {
      console.error("Invalid date format in mood data:", item.date);
      return false;
    }
  });

  return (
    <Card className="p-6 backdrop-blur-lg bg-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Moodboard</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Přidat dnešní náladu</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Jak se dnes cítíš?</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="space-y-4">
                {Object.entries(emotions).map(([category, moods]) => (
                  <div key={category}>
                    <Label className="text-sm text-muted-foreground mb-2">{category}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {moods.map((mood) => (
                        <Button
                          key={mood}
                          variant={selectedMood === mood ? "default" : "outline"}
                          onClick={() => setSelectedMood(mood)}
                          className="text-sm"
                        >
                          {mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Jaká potřeba není naplněna?</Label>
                <div className="grid grid-cols-3 gap-2">
                  {needs.map((need) => (
                    <Button
                      key={need}
                      variant={selectedNeed === need ? "default" : "outline"}
                      onClick={() => setSelectedNeed(need)}
                      className="text-sm"
                    >
                      {need}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Poznámky</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Chceš si něco poznamenat?"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Uložit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={safeChartData}>
            <XAxis 
              dataKey="date" 
              stroke="#fff"
              tickFormatter={(dateStr) => {
                try {
                  const date = new Date(dateStr);
                  if (isValid(date)) {
                    return format(date, 'd. MMM', { locale: cs });
                  }
                  return '';
                } catch (e) {
                  console.error("Error formatting date:", e);
                  return '';
                }
              }}
            />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#333',
                border: '1px solid #666',
                borderRadius: '8px',
                color: '#fff'
              }}
              labelFormatter={(dateStr) => {
                try {
                  const date = new Date(dateStr);
                  if (isValid(date)) {
                    return format(date, 'PPP', { locale: cs });
                  }
                  return 'Neplatné datum';
                } catch (e) {
                  console.error("Error formatting date in tooltip:", e);
                  return 'Neplatné datum';
                }
              }}
            />
            <Line 
              type="monotone" 
              dataKey="mood_type" 
              stroke="#ea384c"
              dot={{ fill: '#ea384c' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
