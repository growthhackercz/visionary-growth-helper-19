
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Calendar, Star } from "lucide-react";

interface GoalsSectionProps {
  weeklyGoal: string;
  monthlyGoal: string;
  yearlyGoal: string;
  monthlyProgress: number;
}

export const GoalsSection = ({
  weeklyGoal = "Nastavit týdenní cíl",
  monthlyGoal = "Nastavit měsíční cíl",
  yearlyGoal = "Nastavit roční cíl",
  monthlyProgress = 0
}: GoalsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4 backdrop-blur-lg bg-gradient-to-r from-primary/20 to-primary/10 border-primary/20 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Týdenní cíl</h3>
          </div>
          <p className="text-white/90 text-xl font-medium">{weeklyGoal}</p>
        </Card>

        <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Měsíční cíl</h3>
            </div>
            <span className="text-sm text-white/60">{monthlyProgress}%</span>
          </div>
          <Progress value={monthlyProgress} className="h-2" />
          <p className="text-white/90">{monthlyGoal}</p>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-lg bg-card border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">Plánování cílů</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-white/90 font-medium mb-2">Roční cíl</h4>
            <p className="text-white/80">{yearlyGoal}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white/90 font-medium">Tipy pro plánování cílů:</h4>
            <ul className="list-disc pl-5 space-y-2 text-white/80">
              <li>Rozdělte své cíle do oblastí: kariéra, zdraví, vztahy, osobní rozvoj, finance</li>
              <li>Používejte metodu SMART - specifické, měřitelné, dosažitelné, relevantní a časově ohraničené cíle</li>
              <li>Týdenní cíle by měly přímo přispívat k dosažení měsíčních cílů</li>
              <li>Zaměřte se na 1-3 klíčové cíle v každém časovém horizontu</li>
              <li>Pravidelně revidujte a upravujte své cíle podle aktuální situace</li>
              <li>Zapisujte si pokrok a slavte malé úspěchy na cestě k velkým cílům</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="p-4 bg-secondary/50 border-white/5">
                <h5 className="font-medium text-white mb-2">Oblasti života</h5>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>🎯 Kariéra a práce</li>
                  <li>❤️ Vztahy a rodina</li>
                  <li>🧠 Osobní rozvoj</li>
                  <li>💪 Zdraví a fitness</li>
                  <li>💰 Finance</li>
                  <li>🎨 Koníčky a zábava</li>
                </ul>
              </Card>

              <Card className="p-4 bg-secondary/50 border-white/5">
                <h5 className="font-medium text-white mb-2">Časové horizonty</h5>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>📅 Týdenní focus</li>
                  <li>📆 Měsíční milníky</li>
                  <li>🎯 Kvartální cíle</li>
                  <li>🌟 Roční vize</li>
                </ul>
              </Card>

              <Card className="p-4 bg-secondary/50 border-white/5">
                <h5 className="font-medium text-white mb-2">Klíčové otázky</h5>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>Proč je tento cíl důležitý?</li>
                  <li>Jak poznám, že jsem uspěl/a?</li>
                  <li>Jaké jsou první 3 kroky?</li>
                  <li>Co mi může bránit v úspěchu?</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
