
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, ArrowUpCircle, Circle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Todos = () => {
  const tasks = [
    {
      id: 1,
      title: "Připravit prezentaci",
      time: "10:00 - 12:00",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Odpovědět na emaily",
      time: "13:00 - 14:00",
      priority: "medium",
      completed: true,
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">To-Do-All</h1>
          <p className="text-lg text-white/80">Vizualizujte a plánujte své úkoly</p>
        </section>

        <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Dnešní úkoly</h2>
            <Button>
              <Plus className="mr-2" size={20} />
              Naplánovat úkol
            </Button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-4 rounded-lg transition-colors",
                  task.completed ? "bg-secondary/30" : "bg-secondary/50 hover:bg-secondary/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {task.completed ? (
                      <CheckCircle className="text-primary w-6 h-6" />
                    ) : task.priority === "high" ? (
                      <ArrowUpCircle className="text-red-500 w-6 h-6" />
                    ) : (
                      <Circle className="text-white/50 w-6 h-6" />
                    )}
                    <div className="space-y-1">
                      <h3 className={cn(
                        "font-medium",
                        task.completed ? "text-white/50 line-through" : "text-white"
                      )}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Clock size={14} />
                        <span>{task.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Todos;

