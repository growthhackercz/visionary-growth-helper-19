
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, ArrowUpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Weekly = () => {
  const { toast } = useToast();
  const [lastWeekGoal] = useState("Meditovat každé ráno 10 minut"); // This would come from your previous reflection
  const [flexTime, setFlexTime] = useState("");
  const [nextGoal, setNextGoal] = useState("");

  const handleSave = () => {
    // Here you would save the reflection and create a new todo
    if (nextGoal) {
      // Create new high-priority todo logic would go here
      toast({
        title: "Úkol přidán do To-Do-All",
        description: "Nový prioritní úkol byl vytvořen z vašeho týdenního cíle.",
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

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-white">4 týdny v řadě</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-white">300 bodů celkem</span>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
            <div className="space-y-4 p-4 bg-secondary/30 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white">Minulý týdenní cíl</h3>
              <p className="text-white/90">{lastWeekGoal}</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-white">Kam jste se od poslední schůzky posunuli?</label>
                <Textarea 
                  className="min-h-[100px] bg-secondary text-white" 
                  placeholder="Napište svou odpověď..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-white">Kdy si berete 5 hodin flex time tento týden?</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <input 
                    type="datetime-local" 
                    className="flex-1 bg-secondary text-white rounded-md p-2 border border-white/10"
                    value={flexTime}
                    onChange={(e) => setFlexTime(e.target.value)}
                  />
                </div>
                <p className="text-sm text-white/60">Vyhraďte si čas jen pro sebe</p>
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

              <Button onClick={handleSave} className="w-full">
                Uložit reflexi
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Weekly;
