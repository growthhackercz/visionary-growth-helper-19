
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trophy, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Habits = () => {
  const { toast } = useToast();

  // Mockup data - later this will come from the database
  const habits = [
    {
      id: 1,
      name: "Ranní cvičení",
      streak: 3,
      targetValue: 20,
      targetUnit: "minut",
      weekProgress: [
        { day: "Po", value: 25, status: "success" },
        { day: "Út", value: 15, status: "partial" },
        { day: "St", value: 20, status: "success" },
        { day: "Čt", value: 0, status: "failed" },
        { day: "Pá", value: null, status: null },
        { day: "So", value: null, status: null },
        { day: "Ne", value: null, status: null },
      ],
    },
    {
      id: 2,
      name: "Meditace",
      streak: 5,
      targetValue: 10,
      targetUnit: "minut",
      weekProgress: [
        { day: "Po", value: 15, status: "success" },
        { day: "Út", value: 10, status: "success" },
        { day: "St", value: 10, status: "success" },
        { day: "Čt", value: 8, status: "partial" },
        { day: "Pá", value: null, status: null },
        { day: "So", value: null, status: null },
        { day: "Ne", value: null, status: null },
      ],
    },
    {
      id: 3,
      name: "Čtení",
      streak: 2,
      targetValue: 30,
      targetUnit: "stran",
      weekProgress: [
        { day: "Po", value: 35, status: "success" },
        { day: "Út", value: 20, status: "partial" },
        { day: "St", value: 0, status: "failed" },
        { day: "Čt", value: 30, status: "success" },
        { day: "Pá", value: null, status: null },
        { day: "So", value: null, status: null },
        { day: "Ne", value: null, status: null },
      ],
    },
  ];

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
                <TableHead className="text-white font-['Caveat'] text-lg">Návyk</TableHead>
                <TableHead className="text-white font-['Caveat'] text-lg">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-primary" />
                    Série
                  </div>
                </TableHead>
                <TableHead className="text-white font-['Caveat'] text-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    Cíl
                  </div>
                </TableHead>
                {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => (
                  <TableHead key={day} className="text-white font-['Caveat'] text-lg">
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {habits.map((habit) => (
                <TableRow 
                  key={habit.id} 
                  className="hover:bg-white/5 transition-colors border-b border-white/10"
                >
                  <TableCell className="font-medium text-white font-['Caveat'] text-lg">
                    {habit.name}
                  </TableCell>
                  <TableCell className="text-primary font-['Caveat'] text-lg">
                    {habit.streak} dní
                  </TableCell>
                  <TableCell className="text-white/80 font-['Caveat'] text-lg">
                    {habit.targetValue} {habit.targetUnit}
                  </TableCell>
                  {habit.weekProgress.map((day, index) => (
                    <TableCell 
                      key={index}
                      className={`font-['Caveat'] text-lg text-center ${getStatusColor(day.status)}`}
                    >
                      {day.value !== null ? `${day.value}` : "—"}
                    </TableCell>
                  ))}
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
