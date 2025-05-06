
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { subDays, format, isValid } from 'date-fns';

interface HabitStatsProps {
  habits: any[];
}

export const HabitStats = ({ habits }: HabitStatsProps) => {
  // Prepare data for last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), i);
    const formattedDate = format(date, 'dd.MM.yyyy');
    const completedHabits = habits.filter(habit => 
      habit.habit_progress?.some((p: any) => {
        try {
          const progressDate = new Date(p.date);
          return isValid(progressDate) && 
                 format(progressDate, 'dd.MM.yyyy') === formattedDate &&
                 p.status === 'success';
        } catch (e) {
          console.error("Invalid date in habit progress:", p.date);
          return false;
        }
      })
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
    <Card variant="glass" className="p-6 spacing-y-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Statistiky posledních 30 dní</h3>
        <div className="text-sm text-white/60">
          Průměrné plnění: <span className="font-medium text-primary">{averageCompletion.toFixed(1)}%</span>
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
              tickFormatter={(value) => {
                const parts = value.split('.');
                return `${parts[0]}.${parts[1]}`;
              }}
            />
            <YAxis 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60' }}
              unit="%"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.95)', 
                border: '1px solid #333',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              labelStyle={{ color: '#fff', fontWeight: 500 }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar 
              dataKey="percentage" 
              fill="#ea384c" 
              radius={[4, 4, 0, 0]}
              name="Splněné návyky"
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {habits.map(habit => (
          <Card key={habit.id} variant="glass" size="sm" className="hover-card-effect">
            <div className="spacing-y-sm">
              <h4 className="font-semibold text-white">{habit.name}</h4>
              <div className="text-sm text-white/60">
                <div>Aktuální série: <span className="text-success">{habit.current_streak} dní</span></div>
                <div>Nejdelší série: <span className="text-accent">{habit.best_streak} dní</span></div>
                <div>
                  Úspěšnost: <span className="text-primary">{
                    ((habit.habit_progress?.filter((p: any) => p.status === 'success').length || 0) / 30 * 100).toFixed(1)
                  }%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
