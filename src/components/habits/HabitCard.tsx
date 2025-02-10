
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { categoryIcons } from "./CategoryIcons";
import { Award, Check, Flame } from "lucide-react";

interface HabitCardProps {
  habit: any;
  onComplete: () => void;
}

export const HabitCard = ({ habit, onComplete }: HabitCardProps) => {
  const today = format(new Date(), 'dd.MM.yyyy');
  const isCompletedToday = habit.habit_progress?.some((p: any) => 
    format(new Date(p.date), 'dd.MM.yyyy') === today &&
    p.status === 'success'
  );

  const progressPercentage = (habit.habit_progress?.filter((p: any) => p.status === 'success').length || 0) / 30 * 100;

  return (
    <Card className="p-6 backdrop-blur-lg bg-card/30 border-white/10 hover:bg-card/40 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {categoryIcons[habit.habit_categories.name]}
            <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
          </div>
          {isCompletedToday ? (
            <div className="bg-green-500/20 text-green-500 p-2 rounded-full">
              <Check className="h-5 w-5" />
            </div>
          ) : (
            <Button
              size="sm"
              onClick={onComplete}
              className="bg-green-500 hover:bg-green-600"
            >
              Splnit
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/60">
            <span>Cíl: {habit.target_value} {habit.target_unit}</span>
            <span>Série: {habit.current_streak} dní</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-yellow-500">
              <Flame className="h-4 w-4" />
              <span className="text-sm">Série: {habit.current_streak}</span>
            </div>
            {habit.best_streak > 0 && (
              <div className="flex items-center gap-1 text-purple-500">
                <Award className="h-4 w-4" />
                <span className="text-sm">Rekord: {habit.best_streak}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

