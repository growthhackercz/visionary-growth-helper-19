import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { useState } from "react";
import { HabitTree } from "@/components/habits/HabitTree";
import { AddHabitDialog } from "@/components/habits/AddHabitDialog";
import { CategoryFilters } from "@/components/habits/CategoryFilters";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HabitCard } from "@/components/habits/HabitCard";
import { HabitStats } from "@/components/habits/HabitStats";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, TrendingUp } from "lucide-react";
import { HabitTable } from "@/components/habits/HabitTable";

const Habits = () => {
  const { toast } = useToast();
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'dd.MM.yyyy');
  });

  const { data: habits, refetch: refetchHabits } = useQuery({
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

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('habit_categories')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: dailyRatings, refetch: refetchRatings } = useQuery({
    queryKey: ['daily_ratings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_ratings')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleHabitComplete = async (habitId: string, date: string) => {
    try {
      const { error } = await supabase
        .from('habit_progress')
        .upsert([{
          habit_id: habitId,
          date,
          status: 'success',
          value: 1,
        }], {
          onConflict: 'habit_id,date'
        });

      if (error) throw error;

      toast({
        title: "Skvělá práce!",
        description: "Získáváš 10 bodů za splnění návyku. Pokračuj dál!",
        duration: 3000,
      });

      refetchHabits();
    } catch (error) {
      toast({
        title: "Chyba při ukládání postupu",
        description: "Zkuste to prosím znovu",
        variant: "destructive",
      });
    }
  };

  const handleDailyRating = async (date: string, rating: number) => {
    try {
      const { error } = await supabase
        .from('daily_ratings')
        .upsert([{
          date,
          rating,
        }]);

      if (error) throw error;

      toast({
        title: "Hodnocení uloženo",
        description: "Děkujeme za vaše hodnocení dne",
      });

      setSelectedRating(null);
      refetchRatings();
    } catch (error) {
      toast({
        title: "Chyba při ukládání hodnocení",
        description: "Zkuste to prosím znovu",
        variant: "destructive",
      });
    }
  };

  const today = format(new Date(), 'dd.MM.yyyy');
  const totalHabits = habits?.length || 0;
  const completedHabits = habits?.filter(habit => 
    habit.habit_progress?.some(p => 
      format(new Date(p.date), 'dd.MM.yyyy') === today && 
      p.status === 'success'
    )
  ).length || 0;

  const maxStreak = Math.max(...(habits?.map(h => h.current_streak || 0) || [0]));

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="relative text-center space-y-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-8 rounded-lg backdrop-blur-lg">
          <h1 className="text-4xl font-bold text-white font-['Caveat']">Buzer lístek</h1>
          <p className="text-xl text-white/80 font-['Caveat']">Sleduj své každodenní návyky a staň se lepším člověkem</p>
          <HabitTree 
            totalHabits={totalHabits}
            completedHabits={completedHabits}
            streakCount={maxStreak}
          />
        </section>

        <div className="flex justify-between items-center mb-4">
          <CategoryFilters />
          <Button
            onClick={() => setIsAddHabitOpen(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Přidat návyk
          </Button>
        </div>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="cards">
              <PlusCircle className="mr-2 h-4 w-4" />
              Karty
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="mr-2 h-4 w-4" />
              Kalendář
            </TabsTrigger>
            <TabsTrigger value="stats">
              <TrendingUp className="mr-2 h-4 w-4" />
              Statistiky
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits?.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={() => handleHabitComplete(habit.id, today)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="p-6 backdrop-blur-lg bg-card/30 border-white/10">
              <HabitTable
                habits={habits || []}
                last14Days={last14Days}
                dailyRatings={dailyRatings || []}
                selectedRating={selectedRating}
                onHabitComplete={handleHabitComplete}
                onDailyRating={handleDailyRating}
              />
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <HabitStats habits={habits || []} />
          </TabsContent>
        </Tabs>

        <AddHabitDialog
          isOpen={isAddHabitOpen}
          onOpenChange={setIsAddHabitOpen}
          categories={categories || []}
          onHabitAdded={refetchHabits}
        />
      </div>
    </Layout>
  );
};

export default Habits;
