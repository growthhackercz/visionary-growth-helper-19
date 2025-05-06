
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
import { Badge } from "@/components/ui/badge";

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
        return "bg-success/20 text-success font-medium";
      case "partial":
        return "bg-accent/20 text-accent font-medium";
      case "failed":
        return "bg-destructive/20 text-destructive font-medium";
      default:
        return "bg-secondary/50 text-white/60";
    }
  };

  const getDailySummaryStatus = (date: string, habitsData: any[]) => {
    if (!habitsData?.length) return null;
    
    const dayProgress = habitsData.map(habit => {
      const progress = habit.habit_progress?.find((p: any) => {
        try {
          return format(new Date(p.date), 'dd.MM.yyyy') === date;
        } catch (e) {
          console.error("Invalid date format:", p.date);
          return false;
        }
      });
      return progress?.status;
    });

    const rating = dailyRatings?.find(r => {
      try {
        return format(new Date(r.date), 'dd.MM.yyyy') === date;
      } catch (e) {
        console.error("Invalid date format:", r.date);
        return false;
      }
    });
    
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
    <div className="rounded-lg border border-white/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-white/10">
            <TableHead className="text-white font-caveat text-lg">Datum</TableHead>
            {habits?.map((habit) => (
              <TableHead 
                key={habit.id} 
                className="text-white font-caveat text-lg text-center"
              >
                <div className="spacing-y-sm">
                  <div className="flex items-center justify-center gap-2">
                    {categoryIcons[habit.habit_categories.name]}
                    <span>{habit.name}</span>
                  </div>
                  <div className="text-primary/80 text-sm spacing-y-sm">
                    <div>Min: {habit.target_value} {habit.target_unit}</div>
                    <div>Frekvence: {frequencies.find(f => f.value === habit.frequency)?.label}</div>
                    <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                      Série: {habit.current_streak} dní
                    </Badge>
                    {habit.best_streak > 0 && (
                      <Badge variant="outline" className="ml-1 text-warning border-warning/30 bg-warning/10">
                        Nejlepší: {habit.best_streak} dní
                      </Badge>
                    )}
                  </div>
                </div>
              </TableHead>
            ))}
            <TableHead className="text-white font-caveat text-lg text-center">
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
              <TableCell className="font-medium text-white font-caveat text-lg">
                {date}
              </TableCell>
              {habits?.map((habit) => {
                const progress = habit.habit_progress?.find((p: any) => {
                  try {
                    return format(new Date(p.date), 'dd.MM.yyyy') === date;
                  } catch (e) {
                    console.error("Invalid date format:", p.date);
                    return false;
                  }
                });
                
                return (
                  <TableCell 
                    key={`${habit.id}-${date}`}
                    className={`font-caveat text-lg text-center relative group ${getStatusColor(progress?.status)}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        {progress?.value || "—"}
                        {progress?.notes && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/90 backdrop-blur-md rounded text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-card-sm">
                            {progress.notes}
                          </div>
                        )}
                      </div>
                      {!progress && (
                        <Button
                          size="xs"
                          variant="glass-primary"
                          className="text-white/80 hover:text-white"
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
                  <div className={`font-caveat text-lg ${getStatusColor(getDailySummaryStatus(date, habits))}`}>
                    {dailyRatings?.find(r => {
                      try {
                        return format(new Date(r.date), 'dd.MM.yyyy') === date;
                      } catch (e) {
                        return false;
                      }
                    })?.rating || "•"}
                  </div>
                  <Select
                    value={selectedRating?.toString()}
                    onValueChange={(value) => {
                      const rating = parseInt(value);
                      onDailyRating(date, rating);
                    }}
                  >
                    <SelectTrigger className="w-20 glass-input">
                      <SelectValue placeholder="0-10" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/10">
                      {Array.from({ length: 11 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()} className="hover:bg-white/10">
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
    </div>
  );
};
