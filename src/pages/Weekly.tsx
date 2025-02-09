
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, ArrowUpCircle, CheckCircle2, ThumbsUp, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Weekly = () => {
  const { toast } = useToast();
  const [lastWeekGoal] = useState("Meditovat každé ráno 10 minut");
  const [goalProgress, setGoalProgress] = useState(70); // Progress percentage
  const [flexTime, setFlexTime] = useState("");
  const [nextGoal, setNextGoal] = useState("");
  const [weeklyMood, setWeeklyMood] = useState(8);
  const [progress, setProgress] = useState("");

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

        <div className="grid gap-6">
          <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
            {/* Previous Goal Section */}
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
              {/* Progress Section */}
              <div className="space-y-2">
                <label className="text-white">Kam jste se od poslední schůzky posunuli?</label>
                <Textarea 
                  className="min-h-[100px] bg-secondary text-white" 
                  placeholder="Napište svou odpověď..."
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                />
              </div>

              {/* Flex Time Section */}
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

              {/* Weekly Mood */}
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

              {/* Methods Usage */}
              <div className="space-y-2">
                <label className="text-white">Jak využíváte metody? (1-10)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  className="w-full accent-primary bg-secondary h-2 rounded-lg"
                />
              </div>

              {/* Next Goal Section */}
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
