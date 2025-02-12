
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Book, Target, Dumbbell, Utensils } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ChallengeArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface AreaProgress {
  current_streak: number;
  best_streak: number;
  total_completed: number;
}

export const ChallengeCategories = () => {
  const [areas, setAreas] = useState<ChallengeArea[]>([]);
  const [progress, setProgress] = useState<Record<string, AreaProgress>>({});

  useEffect(() => {
    fetchAreas();
    fetchProgress();
  }, []);

  const fetchAreas = async () => {
    const { data } = await supabase
      .from('challenge_areas')
      .select('*')
      .order('name');
    
    if (data) setAreas(data);
  };

  const fetchProgress = async () => {
    const { data } = await supabase
      .from('area_progress')
      .select('*');
    
    if (data) {
      const progressMap = data.reduce((acc, curr) => ({
        ...acc,
        [curr.area_id]: {
          current_streak: curr.current_streak,
          best_streak: curr.best_streak,
          total_completed: curr.total_completed
        }
      }), {});
      setProgress(progressMap);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      '🧠': Brain,
      '❤️': Heart,
      '📚': Book,
      '🎯': Target,
      '💪': Dumbbell,
      '🥗': Utensils
    };
    return icons[iconName] || Target;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {areas.map((area) => {
        const IconComponent = getIconComponent(area.icon);
        const areaProgress = progress[area.id];
        const completionPercentage = areaProgress ? 
          (areaProgress.total_completed / 10) * 100 : 0;

        return (
          <Card 
            key={area.id}
            className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-10"
                 style={{ background: `linear-gradient(to bottom right, ${area.color}20, ${area.color}10)` }} 
            />
            <div className="relative p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full" style={{ backgroundColor: `${area.color}20` }}>
                  <IconComponent className="w-6 h-6" style={{ color: area.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{area.name}</h3>
                  <p className="text-sm text-white/60">{area.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Pokrok</span>
                  <span>{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ 
                      width: `${completionPercentage}%`,
                      backgroundColor: area.color 
                    }}
                  />
                </Progress>
              </div>

              {areaProgress && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Aktuální série</div>
                    <div className="text-lg font-semibold text-white">
                      {areaProgress.current_streak} dní
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Nejdelší série</div>
                    <div className="text-lg font-semibold text-white">
                      {areaProgress.best_streak} dní
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
