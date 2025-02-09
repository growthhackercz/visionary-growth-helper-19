
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const DailyChallenge = () => {
  return (
    <Card className="p-6 backdrop-blur-lg bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10 transition-colors mx-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold text-white">Denní výzva</h2>
            <p className="text-white/80">Věnuj 5 minut ranní meditaci</p>
          </div>
        </div>
        <Button variant="secondary" className="hover:bg-yellow-500 hover:text-white transition-colors">
          Začít výzvu
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
