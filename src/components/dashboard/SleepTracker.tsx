
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, isValid } from "date-fns";
import { cs } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";

const morningMoods = [
  "Svěží a odpočatý/á",
  "Celkem v pohodě",
  "Trochu unavený/á",
  "Neodpočatý/á",
  "Vyčerpaný/á"
];

interface SleepData {
  date: string;
  hours_slept: number;
  quality_rating: number;
  morning_mood: string | null;
  notes: string | null;
}

export const SleepTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoursSlept, setHoursSlept] = useState("8.0");
  const [qualityRating, setQualityRating] = useState(3);
  const [selectedMood, setSelectedMood] = useState("");
  const [notes, setNotes] = useState("");
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchSleepData();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchSleepData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSleepData = async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from('sleep_records')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: true });

    if (error) {
      toast.error("Nepodařilo se načíst data o spánku");
      return;
    }

    setSleepData(data || []);
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast.error("Nejste přihlášen/a");
      return;
    }

    if (!hoursSlept || !selectedMood) {
      toast.error("Prosím vyplňte všechna povinná pole");
      return;
    }

    const { error } = await supabase
      .from('sleep_records')
      .insert({
        user_id: session.user.id,
        hours_slept: parseFloat(hoursSlept),
        quality_rating: qualityRating,
        morning_mood: selectedMood,
        notes: notes || null,
      });

    if (error) {
      if (error.code === '23505') {
        toast.error("Pro dnešní den už máte záznam");
      } else {
        toast.error("Nepodařilo se uložit záznam o spánku");
      }
      return;
    }

    toast.success("Záznam o spánku byl uložen");
    setIsOpen(false);
    setHoursSlept("8.0");
    setQualityRating(3);
    setSelectedMood("");
    setNotes("");
    fetchSleepData();
  };

  const safeChartData = sleepData.filter(item => {
    try {
      const date = new Date(item.date);
      return isValid(date);
    } catch (e) {
      console.error("Invalid date format in sleep data:", item.date);
      return false;
    }
  });

  return (
    <Card className="p-6 backdrop-blur-lg bg-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Time Sleeper</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Přidat záznam o spánku</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Jak se ti dnes spalo?</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label>Počet hodin spánku</Label>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={hoursSlept}
                  onChange={(e) => setHoursSlept(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Kvalita spánku (1-5)</Label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[qualityRating]}
                  onValueChange={(value) => setQualityRating(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Špatná</span>
                  <span>Výborná</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Jak se cítíš po probuzení?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {morningMoods.map((mood) => (
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

              <div className="space-y-2">
                <Label>Poznámky</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Něco tě rušilo? Chceš si něco poznamenat?"
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
          <AreaChart data={safeChartData}>
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
            <Area 
              type="monotone" 
              dataKey="hours_slept" 
              stroke="#ea384c"
              fill="#ea384c"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
