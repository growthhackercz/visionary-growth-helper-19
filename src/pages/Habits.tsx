
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart, User, Briefcase, Book, Compass, X } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categoryIcons: Record<string, React.ReactNode> = {
  Health: <Heart className="w-4 h-4" />,
  Personal: <User className="w-4 h-4" />,
  Work: <Briefcase className="w-4 h-4" />,
  Learning: <Book className="w-4 h-4" />,
  Spiritual: <Compass className="w-4 h-4" />,
};

const frequencies = [
  { value: "daily", label: "Každý den" },
  { value: "weekly", label: "Každý týden" },
  { value: "monthly", label: "Každý měsíc" },
];

const AddHabitSchema = z.object({
  name: z.string().min(1, "Název je povinný"),
  frequency: z.string(),
  targetValue: z.number().min(1, "Minimální hodnota musí být větší než 0"),
  targetUnit: z.string().min(1, "Jednotka je povinná"),
  categoryId: z.string().min(1, "Kategorie je povinná"),
});

const Habits = () => {
  const { toast } = useToast();
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'dd.MM.yyyy');
  });

  const form = useForm({
    resolver: zodResolver(AddHabitSchema),
    defaultValues: {
      name: "",
      frequency: "daily",
      targetValue: 1,
      targetUnit: "",
      categoryId: "",
    },
  });

  // Fetch habits data with the updated query
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

  // Fetch categories for the form
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

  // Fetch daily ratings
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

  const handleAddHabit = async (values: z.infer<typeof AddHabitSchema>) => {
    try {
      const { error } = await supabase
        .from('habits')
        .insert([{
          name: values.name,
          frequency: values.frequency,
          target_value: values.targetValue,
          target_unit: values.targetUnit,
          category_id: values.categoryId,
        }]);

      if (error) throw error;

      toast({
        title: "Návyk byl úspěšně přidán",
        description: "Můžete začít sledovat svůj nový návyk",
      });

      setIsAddHabitOpen(false);
      form.reset();
      refetchHabits();
    } catch (error) {
      toast({
        title: "Chyba při přidávání návyku",
        description: "Zkuste to prosím znovu",
        variant: "destructive",
      });
    }
  };

  const handleHabitComplete = async (habitId: string, date: string) => {
    try {
      const { error } = await supabase
        .from('habit_progress')
        .insert([{
          habit_id: habitId,
          date,
          status: 'success',
          value: 1,
        }]);

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

  // Calculate daily summary status
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
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white font-['Caveat']">Buzer lístek</h1>
          <p className="text-lg text-white/80 font-['Caveat']">Sledujte své každodenní návyky</p>
          <img 
            src="/elephant-rider.png" 
            alt="Slon s jezdcem"
            className="mx-auto w-32 h-32 object-contain"
          />
        </section>

        <div className="flex justify-end mb-4">
          <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" size={20} />
                Přidat návyk
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Přidat nový návyk</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddHabit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Název návyku</Label>
                        <FormControl>
                          <Input placeholder="Např. Ranní cvičení" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Frekvence opakování</Label>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Vyberte frekvenci" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frequencies.map((freq) => (
                              <SelectItem key={freq.value} value={freq.value}>
                                {freq.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="targetValue"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Minimální laťka</Label>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              placeholder="Např. 30" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetUnit"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Jednotka</Label>
                          <FormControl>
                            <Input placeholder="Např. minut" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Kategorie</Label>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Vyberte kategorii" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsAddHabitOpen(false)}
                    >
                      Zrušit
                    </Button>
                    <Button type="submit">Přidat návyk</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
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
                              className="text-white/60 hover:text-white"
                              onClick={() => handleHabitComplete(habit.id, date)}
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
                          setSelectedRating(rating);
                          handleDailyRating(date, rating);
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
        </Card>
      </div>
    </Layout>
  );
};

export default Habits;

