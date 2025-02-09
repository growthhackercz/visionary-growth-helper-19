
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Plus, Clock, Circle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Todos = () => {
  const timeSlots = [
    {
      id: 1,
      time: "06:00",
      title: "Ranní rutina",
      completed: true,
      color: "purple",
    },
    {
      id: 2,
      time: "08:00",
      title: "Příprava na den",
      completed: true,
      color: "blue",
    },
    {
      id: 3,
      time: "10:00",
      title: "Připravit prezentaci",
      completed: false,
      color: "red",
    },
    {
      id: 4,
      time: "13:00",
      title: "Oběd a odpočinek",
      completed: false,
      color: "green",
    },
    {
      id: 5,
      time: "15:00",
      title: "Meeting s týmem",
      completed: false,
      color: "purple",
    },
    {
      id: 6,
      time: "18:00",
      title: "Osobní projekt",
      completed: false,
      color: "orange",
    },
    {
      id: 7,
      time: "20:00",
      title: "Večerní rutina",
      completed: false,
      color: "blue",
    },
    {
      id: 8,
      time: "22:00",
      title: "Konec dne",
      completed: false,
      color: "purple",
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">To-Do-All</h1>
          <p className="text-lg text-white/80">Vaše cesta dnem</p>
        </section>

        <Card className="p-8 space-y-6 backdrop-blur-lg bg-card/50 border-white/10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-white">Dnešní milníky</h2>
            <Button variant="outline" className="border-dashed hover:border-solid">
              <Plus className="mr-2" size={20} />
              Přidat milník
            </Button>
          </div>

          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-white/10"></div>
            
            <div className="space-y-8">
              {timeSlots.map((slot, index) => (
                <div key={slot.id} className="relative">
                  <div className={cn(
                    "ml-14 p-6 rounded-3xl transition-all duration-300 transform hover:scale-102",
                    "backdrop-blur-sm border-2",
                    slot.completed ? "bg-secondary/30 border-white/20" : "bg-secondary/50 hover:bg-secondary/60",
                    slot.color === "red" && "border-red-400/50",
                    slot.color === "blue" && "border-blue-400/50",
                    slot.color === "purple" && "border-purple-400/50",
                    slot.color === "green" && "border-green-400/50",
                    slot.color === "orange" && "border-orange-400/50"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className="absolute left-0 -translate-x-[15px] flex items-center gap-2">
                        <span className="text-sm text-white/60 w-12 text-right">{slot.time}</span>
                        {slot.completed ? (
                          <CheckCircle className={cn(
                            "w-6 h-6",
                            slot.color === "red" && "text-red-400",
                            slot.color === "blue" && "text-blue-400",
                            slot.color === "purple" && "text-purple-400",
                            slot.color === "green" && "text-green-400",
                            slot.color === "orange" && "text-orange-400"
                          )} />
                        ) : (
                          <Circle className={cn(
                            "w-6 h-6",
                            slot.color === "red" && "text-red-400/50",
                            slot.color === "blue" && "text-blue-400/50",
                            slot.color === "purple" && "text-purple-400/50",
                            slot.color === "green" && "text-green-400/50",
                            slot.color === "orange" && "text-orange-400/50"
                          )} />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className={cn(
                          "font-medium text-lg",
                          slot.completed ? "text-white/50 line-through" : "text-white"
                        )}>
                          {slot.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {index < timeSlots.length - 1 && (
                    <div className={cn(
                      "absolute left-[27px] top-14 bottom-[-28px] w-0.5",
                      slot.color === "red" && "bg-red-400/20",
                      slot.color === "blue" && "bg-blue-400/20",
                      slot.color === "purple" && "bg-purple-400/20",
                      slot.color === "green" && "bg-green-400/20",
                      slot.color === "orange" && "bg-orange-400/20"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Todos;
