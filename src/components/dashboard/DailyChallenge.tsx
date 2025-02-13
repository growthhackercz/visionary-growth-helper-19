
import { useState, useEffect } from "react";
import { Trophy, ArrowRight, Timer, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Challenge {
  id: string;
  title: string;
  description: string;
  area_id: string;
  xp_reward: number;
  is_completed: boolean;
}

export const DailyChallenge = () => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchDailyChallenge();
  }, []);

  const fetchDailyChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_challenges')
        .select('*, challenge_areas(*)')
        .eq('date', new Date().toISOString().split('T')[0])
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setChallenge(data);
        // Simulace postupu pro demonstraci
        setProgress(data.is_completed ? 100 : Math.floor(Math.random() * 30));
      }
    } catch (error) {
      console.error('Error fetching challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChallenge = async () => {
    if (!challenge) return;

    toast({
      title: "Výzva zahájena! 🎯",
      description: "Hodně štěstí při plnění dnešní výzvy.",
    });

    // Aktualizace progressu
    const newProgress = Math.min(progress + 25, 100);
    setProgress(newProgress);

    if (newProgress === 100) {
      await supabase
        .from('daily_challenges')
        .update({ is_completed: true })
        .eq('id', challenge.id);

      toast({
        title: "Gratulujeme! 🎉",
        description: `Získáváš ${challenge.xp_reward} XP za splnění výzvy!`,
      });
    }
  };

  if (loading) {
    return (
      <Card className="p-6 backdrop-blur-lg bg-yellow-500/5 border-yellow-500/20 animate-pulse">
        <div className="h-20 bg-yellow-500/10 rounded" />
      </Card>
    );
  }

  // Show placeholder when no challenge is available
  if (!challenge) {
    return (
      <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-red-500/10 border-yellow-500/20 hover:bg-yellow-500/15 transition-all duration-500 group mx-4">
        <div className="relative p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-yellow-500/10">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Denní výzva</h2>
              <p className="text-white/80">Žádná výzva není momentálně k dispozici</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-red-500/10 border-yellow-500/20 hover:bg-yellow-500/15 transition-all duration-500 group mx-4">
      {/* Dekorativní pozadí */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-50" />
      
      {/* Světelný efekt při hoveru */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent" />
      
      <div className="relative p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-yellow-500/10 group-hover:scale-110 transition-transform duration-500">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Denní výzva</h2>
              <p className="text-white/80">
                {challenge?.title || "Věnuj 5 minut ranní meditaci"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/60">
              <Timer className="w-4 h-4" />
              <span>10 min</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Target className="w-4 h-4" />
              <span>{challenge?.xp_reward || 50} XP</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>Postup</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        <Button
          variant="secondary"
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-500"
          onClick={handleStartChallenge}
        >
          {progress === 100 ? "Výzva splněna!" : "Začít výzvu"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
