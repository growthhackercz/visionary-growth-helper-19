import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { frequencies } from "@/lib/constants";
import { categoryIcons } from "@/components/habits/CategoryIcons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HabitTableProps {
  habits: any[];
  last14Days: string[];
  dailyRatings: any[];
  selectedRating: number | null;
  onHabitComplete: (habitId: string, date: string) => void;
  onDailyRating: (date: string, rating: number) => void;
}

export const HabitTable = ({
  habits,
  last14Days,
  dailyRatings,
  selectedRating,
  onHabitComplete,
  onDailyRating,
}: HabitTableProps) => {
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-500";
      case "partial":
        return "bg-blue-500/20 text-blue-500";
      case "failed":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-secondary/50 text-white/60";
    }
  };

  const getDailySummaryStatus = (date: string, habitsData: any[]) => {
    if (!habitsData?.length) return null;
    
    const dayProgress = habitsData.map(habit => {
      const progress = habit.habit_progress?.find((p: any) => 
        format(new Date(p.date), 'dd.MM.yyyy') === date
      );
      return progress?.status;
    });

    const rating = dailyRatings?.find(r => format(new Date(r.date), 'dd.MM.yyyy') === date);
    
    if (rating) {
      if (rating.rating >= 7) return 'success';
      if (rating.rating >= 4) return 'partial';
      return 'failed';
    }

    if (dayProgress.some(status => status === 'failed' || status === null)) {
      return 'failed';
    }
    if (dayProgress.some(status => status === 'partial')) {
      return 'partial';
    }
    return 'success';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-white/10">
          <TableHead className="text-white font-['Caveat'] text-lg">Datum</TableHead>
          {habits?.map((habit) => (
            <TableHead 
              key={habit.id} 
              className="text-white font-['Caveat'] text-lg text-center"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  {categoryIcons[habit.habit_categories.name]}
                  <span>{habit.name}</span>
                </div>
                <div className="text-primary/80 text-sm space-y-1">
                  <div>Min: {habit.target_value} {habit.target_unit}</div>
                  <div>Frekvence: {frequencies.find(f => f.value === habit.frequency)?.label}</div>
                  <div className="text-green-500">Série: {habit.current_streak} dní</div>
                  {habit.best_streak > 0 && (
                    <div className="text-yellow-500">Nejlepší: {habit.best_streak} dní</div>
                  )}
                </div>
              </div>
            </TableHead>
          ))}
          <TableHead className="text-white font-['Caveat'] text-lg text-center">
            Denní souhrn
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {last14Days.map((date) => (
          <TableRow 
            key={date}
            className="hover:bg-white/5 transition-colors border-b border-white/10"
          >
            <TableCell className="font-medium text-white font-['Caveat'] text-lg">
              {date}
            </TableCell>
            {habits?.map((habit) => {
              const progress = habit.habit_progress?.find((p: any) => 
                format(new Date(p.date), 'dd.MM.yyyy') === date
              );
              return (
                <TableCell 
                  key={`${habit.id}-${date}`}
                  className={`font-['Caveat'] text-lg text-center relative group ${getStatusColor(progress?.status)}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div>
                      {progress?.value || "—"}
                      {progress?.notes && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/90 rounded text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {progress.notes}
                        </div>
                      )}
                    </div>
                    {!progress && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white hover:bg-white/10"
                        onClick={() => onHabitComplete(habit.id, date)}
                      >
                        Splnit
                      </Button>
                    )}
                  </div>
                </TableCell>
              );
            })}
            <TableCell className="text-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`font-['Caveat'] text-lg ${getStatusColor(getDailySummaryStatus(date, habits))}`}>
                  {dailyRatings?.find(r => format(new Date(r.date), 'dd.MM.yyyy') === date)?.rating || "•"}
                </div>
                <Select
                  value={selectedRating?.toString()}
                  onValueChange={(value) => {
                    const rating = parseInt(value);
                    onDailyRating(date, rating);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="0-10" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
