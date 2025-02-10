
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { subDays, format } from 'date-fns';

interface HabitStatsProps {
  habits: any[];
}

export const HabitStats = ({ habits }: HabitStatsProps) => {
  // Prepare data for last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), i);
    const formattedDate = format(date, 'dd.MM.yyyy');
    const completedHabits = habits.filter(habit => 
      habit.habit_progress?.some((p: any) => 
        format(new Date(p.date), 'dd.MM.yyyy') === formattedDate &&
        p.status === 'success'
      )
    ).length;

    return {
      date: formattedDate,
      completed: completedHabits,
      total: habits.length,
      percentage: habits.length > 0 ? (completedHabits / habits.length) * 100 : 0
    };
  }).reverse();

  const averageCompletion = last30Days.reduce((acc, day) => acc + day.percentage, 0) / last30Days.length;

  return (
    <Card className="p-6 backdrop-blur-lg bg-card/30 border-white/10">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Statistiky posledních 30 dní</h3>
          <div className="text-sm text-white/60">
            Průměrné plnění: {averageCompletion.toFixed(1)}%
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last30Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                dataKey="date" 
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60' }}
                tickFormatter={(value) => format(new Date(value), 'd.M')}
              />
              <YAxis 
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60' }}
                unit="%"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar 
                dataKey="percentage" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
                name="Splněné návyky"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {habits.map(habit => (
            <Card key={habit.id} className="p-4 bg-card/50 border-white/10">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">{habit.name}</h4>
                <div className="text-sm text-white/60">
                  <div>Aktuální série: {habit.current_streak} dní</div>
                  <div>Nejdelší série: {habit.best_streak} dní</div>
                  <div>
                    Úspěšnost: {
                      ((habit.habit_progress?.filter((p: any) => p.status === 'success').length || 0) / 30 * 100).toFixed(1)
                    }%
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

