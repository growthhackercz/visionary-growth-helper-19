
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart, User, Briefcase, Book, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categoryIcons: Record<string, React.ReactNode> = {
  Health: <Heart className="w-4 h-4" />,
  Personal: <User className="w-4 h-4" />,
  Work: <Briefcase className="w-4 h-4" />,
  Learning: <Book className="w-4 h-4" />,
  Spiritual: <Compass className="w-4 h-4" />,
};

const Habits = () => {
  const { toast } = useToast();
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'dd.MM.yyyy');
  });

  // Fetch habits data
  const { data: habits } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('habits')
        .select(`
          *,
          habit_progress (
            date,
            value,
            status,
            notes
          ),
          habit_categories (
            name,
            color,
            icon
          )
        `)
        .order('created_at');
      
      if (error) throw error;
      return data || [];
    },
  });

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

  const handleHabitComplete = () => {
    toast({
      title: "Skvělá práce!",
      description: "Získáváš 10 bodů za splnění návyku. Pokračuj dál!",
      duration: 3000,
    });
  };

  // Calculate daily summary status
  const getDailySummaryStatus = (date: string, habitsData: any[]) => {
    if (!habitsData?.length) return null;
    
    const dayProgress = habitsData.map(habit => {
      const progress = habit.habit_progress?.find((p: any) => 
        format(new Date(p.date), 'dd.MM.yyyy') === date
      );
      return progress?.status;
    });

    if (dayProgress.some(status => status === 'failed' || status === null)) {
      return 'failed';
    }
    if (dayProgress.some(status => status === 'partial')) {
      return 'partial';
    }
    return 'success';
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white font-['Caveat']">Buzer lístek</h1>
          <p className="text-lg text-white/80 font-['Caveat']">Sledujte své každodenní návyky</p>
        </section>

        <div className="flex justify-end mb-4">
          <Button>
            <Plus className="mr-2" size={20} />
            Přidat návyk
          </Button>
        </div>

        <Card className="p-6 backdrop-blur-lg bg-card border-white/10">
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
                        {categoryIcons[habit.category]}
                        <span>{habit.name}</span>
                      </div>
                      <div className="text-primary/80 text-sm space-y-1">
                        <div>Min: {habit.target_value} {habit.target_unit}</div>
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
                        <div>
                          {progress?.value || "—"}
                          {progress?.notes && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/90 rounded text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              {progress.notes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                  <TableCell 
                    className={`font-['Caveat'] text-lg text-center ${getStatusColor(getDailySummaryStatus(date, habits))}`}
                  >
                    •
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default Habits;
