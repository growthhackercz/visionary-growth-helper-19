import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, ArrowUpCircle, CheckCircle2, ThumbsUp, Award, Trophy, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Weekly = () => {
  const { toast } = useToast();
  const [lastWeekGoal] = useState("Meditovat každé ráno 10 minut");
  const [goalProgress, setGoalProgress] = useState(70);
  const [flexTime, setFlexTime] = useState("");
  const [nextGoal, setNextGoal] = useState("");
  const [weeklyMood, setWeeklyMood] = useState(8);
  const [progress, setProgress] = useState("");
  const [streakCount] = useState(15);
  const [weeklyChallenge] = useState({
    title: "Meditační Mistr",
    description: "Medituj 7 dní v řadě",
    reward: 100,
    progress: 5,
  });

  const handleSave = () => {
    if (nextGoal) {
      toast({
        title: "Hlavní priorita přidána",
        description: "Nový vysokoprioritní úkol byl přidán do To-Do-All",
        duration: 3000,
      });
    }

    toast({
      title: "Reflexe uložena",
      description: "Skvělá práce! Získáváš 50 bodů za týdenní reflexi.",
      duration: 3000,
    });
  };

  const heatMapData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    value: Math.floor(Math.random() * 5),
  }));

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Týdenní reflexe</h1>
          <p className="text-lg text-white/80">Pravidelné schůzky sám se sebou</p>
        </section>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-white">4 týdny v řadě</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-white">300 bodů celkem</span>
          </div>
          <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
            <Award className="w-5 h-5 text-green-500" />
            <span className="text-white">Překonal/a jsi 3 cíle v řadě!</span>
          </div>
        </div>

        <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-xl font-bold text-white">{weeklyChallenge.title}</h3>
                <p className="text-white/80">{weeklyChallenge.description}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              +{weeklyChallenge.reward} bodů
            </Badge>
          </div>
          <Progress value={(weeklyChallenge.progress / 7) * 100} className="h-2 bg-purple-950" />
          <p className="text-right mt-2 text-white/60">{weeklyChallenge.progress}/7 dní</p>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="text-xl font-bold text-white">Jsi na vlně!</h3>
                <p className="text-white/80">{streakCount} dní v řadě</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
              🔥 Streak
            </Badge>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-card">
          <h3 className="text-lg font-semibold text-white mb-4">Tvůj pokrok za posledních 30 dní</h3>
          <div className="grid grid-cols-6 gap-2">
            {heatMapData.map((day, i) => (
              <div
                key={i}
                className={`w-full aspect-square rounded-sm ${
                  day.value === 0
                    ? 'bg-secondary/30'
                    : day.value === 1
                    ? 'bg-green-900/30'
                    : day.value === 2
                    ? 'bg-green-700/40'
                    : day.value === 3
                    ? 'bg-green-500/50'
                    : 'bg-green-300/60'
                }`}
                title={`${day.date.toLocaleDateString()}: ${day.value} aktivit`}
              />
            ))}
          </div>
          <div className="flex justify-end mt-2 gap-2">
            <span className="text-xs text-white/60">Méně</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-secondary/30" />
              <div className="w-3 h-3 rounded-sm bg-green-900/30" />
              <div className="w-3 h-3 rounded-sm bg-green-700/40" />
              <div className="w-3 h-3 rounded-sm bg-green-500/50" />
              <div className="w-3 h-3 rounded-sm bg-green-300/60" />
            </div>
            <span className="text-xs text-white/60">Více</span>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
            <div className="space-y-4 p-6 bg-secondary/30 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Minulý týdenní cíl</h3>
                <div className="flex items-center gap-2">
                  <span className="text-white/90">{goalProgress}%</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-white/90">{lastWeekGoal}</p>
              <div className="w-full bg-secondary/50 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-white">Kam jste se od poslední schůzky posunuli?</label>
                <Textarea 
                  className="min-h-[100px] bg-secondary text-white" 
                  placeholder="Napište svou odpověď..."
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Kdy si berete 5 hodin flex time tento týden?
                </label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-secondary text-white rounded-md p-2 border border-white/10"
                  value={flexTime}
                  onChange={(e) => setFlexTime(e.target.value)}
                />
                <p className="text-sm text-white/60">
                  Vyhraďte si čas jen pro sebe - důležité pro vaši mentální pohodu
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-white flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-yellow-500" />
                  Jak se tento týden cítíte? (1-10)
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={weeklyMood}
                  onChange={(e) => setWeeklyMood(Number(e.target.value))}
                  className="w-full accent-primary bg-secondary h-2 rounded-lg"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>Těžký týden</span>
                  <span>Skvělý týden</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white">Jak využíváte metody? (1-10)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  className="w-full accent-primary bg-secondary h-2 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white">Co udělat do příště? (Hlavní priorita)</label>
                <div className="flex items-start gap-2">
                  <ArrowUpCircle className="w-5 h-5 text-red-500 mt-3" />
                  <Textarea 
                    className="min-h-[100px] bg-secondary text-white flex-1" 
                    placeholder="Napište svůj hlavní cíl..."
                    value={nextGoal}
                    onChange={(e) => setNextGoal(e.target.value)}
                  />
                </div>
                <p className="text-sm text-white/60">
                  Tento cíl bude automaticky přidán do To-Do-All jako vysoká priorita
                </p>
              </div>

              <Button 
                onClick={handleSave} 
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Uložit reflexi a získat 50 bodů
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Weekly;
