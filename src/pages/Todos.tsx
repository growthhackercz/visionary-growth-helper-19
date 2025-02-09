
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, ArrowUpCircle, Circle, CheckCircle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Todos = () => {
  const tasks = [
    {
      id: 1,
      title: "Připravit prezentaci",
      time: "10:00 - 12:00",
      priority: "high",
      completed: false,
      color: "red",
    },
    {
      id: 2,
      title: "Odpovědět na emaily",
      time: "13:00 - 14:00",
      priority: "medium",
      completed: false,
      color: "blue",
    },
    {
      id: 3,
      title: "Meeting s týmem",
      time: "15:00 - 16:00",
      priority: "high",
      completed: false,
      color: "purple",
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">To-Do-All</h1>
          <p className="text-lg text-white/80">Vizualizujte a plánujte své úkoly</p>
        </section>

        <Card className="p-8 space-y-6 backdrop-blur-lg bg-card/50 border-white/10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-white">Dnešní plán</h2>
            <Button variant="outline" className="border-dashed hover:border-solid">
              <Plus className="mr-2" size={20} />
              Přidat úkol
            </Button>
          </div>

          <div className="relative space-y-6">
            {tasks.map((task, index) => (
              <div key={task.id} className="relative">
                <div className={cn(
                  "p-6 rounded-2xl transition-all duration-300 transform hover:scale-102",
                  "backdrop-blur-sm border-2 border-dashed",
                  task.completed ? "bg-secondary/30 border-white/10" : "bg-secondary/50 hover:bg-secondary/60",
                  task.color === "red" && "border-red-400/50",
                  task.color === "blue" && "border-blue-400/50",
                  task.color === "purple" && "border-purple-400/50"
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {task.completed ? (
                        <CheckCircle className="text-primary w-6 h-6" />
                      ) : task.priority === "high" ? (
                        <ArrowUpCircle className={cn(
                          "w-6 h-6",
                          task.color === "red" && "text-red-400",
                          task.color === "blue" && "text-blue-400",
                          task.color === "purple" && "text-purple-400"
                        )} />
                      ) : (
                        <Circle className="text-white/50 w-6 h-6" />
                      )}
                      <div className="space-y-2">
                        <h3 className={cn(
                          "font-medium text-lg",
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
                
                {index < tasks.length - 1 && (
                  <div className="absolute left-7 bottom-0 transform translate-y-1/2 z-10">
                    <ArrowDown className={cn(
                      "w-4 h-8",
                      task.color === "red" && "text-red-400/50",
                      task.color === "blue" && "text-blue-400/50",
                      task.color === "purple" && "text-purple-400/50"
                    )} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Todos;
