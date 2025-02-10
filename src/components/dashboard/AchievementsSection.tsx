
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Award, Trophy, Sun, Moon, CheckCheck, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ReactNode> = {
  Star: <Star className="w-6 h-6 text-yellow-500" />,
  Award: <Award className="w-6 h-6 text-blue-500" />,
  Trophy: <Trophy className="w-6 h-6 text-purple-500" />,
  Sun: <Sun className="w-6 h-6 text-orange-500" />,
  Moon: <Moon className="w-6 h-6 text-indigo-500" />,
  CheckCheck: <CheckCheck className="w-6 h-6 text-green-500" />,
  Crown: <Crown className="w-6 h-6 text-yellow-500" />,
};

export const AchievementsSection = () => {
  const { data: achievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*');
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <Card className="p-6 space-y-4 backdrop-blur-lg bg-card/30 border-white/10">
      <h2 className="text-2xl font-bold text-white">Úspěchy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement.id}
            className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
          >
            <div className="flex items-center gap-3">
              {iconMap[achievement.icon]}
              <div>
                <h3 className="font-semibold text-white">{achievement.name}</h3>
                <p className="text-sm text-white/60">{achievement.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-white/10">
                {achievement.category}
              </Badge>
              <span className="text-sm text-white/80">+{achievement.points} bodů</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
