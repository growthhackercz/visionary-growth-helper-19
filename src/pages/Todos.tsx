
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Plus, Circle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const Todos = () => {
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Kalam',
        'url(https://fonts.gstatic.com/s/kalam/v16/YA9dr0Wd4kDdMthROCc.woff2)'
      );
      try {
        await font.load();
        document.fonts.add(font);
        console.log('Kalam font loaded successfully');
      } catch (error) {
        console.error('Error loading Kalam font:', error);
      }
    };
    loadFont();
  }, []);

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
        <section className="text-center space-y-4 font-['Kalam']">
          <h1 className="text-4xl font-bold text-white">To-Do-All</h1>
          <p className="text-xl text-white/80">Vaše cesta dnem</p>
        </section>

        <Card className="p-8 space-y-6 backdrop-blur-lg bg-card/30 border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-['Kalam'] text-white">Dnešní milníky</h2>
            <Button 
              variant="outline" 
              className="border-dashed hover:border-solid font-['Kalam'] text-lg"
            >
              <Plus className="mr-2" size={24} />
              Přidat milník
            </Button>
          </div>

          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-400/30 via-blue-400/30 to-purple-400/30"></div>
            
            <div className="space-y-8">
              {timeSlots.map((slot, index) => (
                <div 
                  key={slot.id} 
                  className={cn(
                    "relative group transition-all duration-500 ease-in-out",
                    "hover:-translate-y-1"
                  )}
                >
                  <div className={cn(
                    "ml-14 p-6 rounded-[2rem] transition-all duration-300",
                    "backdrop-blur-sm border-2",
                    "shadow-lg hover:shadow-xl",
                    "transform hover:scale-105",
                    "bg-white/5",
                    slot.completed ? "border-white/10" : "hover:bg-white/10",
                    slot.color === "red" && "border-red-400/30",
                    slot.color === "blue" && "border-blue-400/30",
                    slot.color === "purple" && "border-purple-400/30",
                    slot.color === "green" && "border-green-400/30",
                    slot.color === "orange" && "border-orange-400/30"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className="absolute left-0 -translate-x-[15px] flex items-center gap-2">
                        <span className="text-base text-white/60 w-12 text-right font-['Kalam']">{slot.time}</span>
                        {slot.completed ? (
                          <CheckCircle className={cn(
                            "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
                            slot.color === "red" && "text-red-400/70",
                            slot.color === "blue" && "text-blue-400/70",
                            slot.color === "purple" && "text-purple-400/70",
                            slot.color === "green" && "text-green-400/70",
                            slot.color === "orange" && "text-orange-400/70"
                          )} />
                        ) : (
                          <Circle className={cn(
                            "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
                            "animate-pulse",
                            slot.color === "red" && "text-red-400/40",
                            slot.color === "blue" && "text-blue-400/40",
                            slot.color === "purple" && "text-purple-400/40",
                            slot.color === "green" && "text-green-400/40",
                            slot.color === "orange" && "text-orange-400/40"
                          )} />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className={cn(
                          "font-['Kalam'] text-xl transition-colors duration-300",
                          slot.completed ? "text-white/40 line-through" : "text-white"
                        )}>
                          {slot.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {index < timeSlots.length - 1 && (
                    <div className={cn(
                      "absolute left-[27px] top-14 bottom-[-28px] w-0.5",
                      "transition-all duration-300 group-hover:opacity-100",
                      "animate-pulse",
                      slot.color === "red" && "bg-gradient-to-b from-red-400/30 to-transparent",
                      slot.color === "blue" && "bg-gradient-to-b from-blue-400/30 to-transparent",
                      slot.color === "purple" && "bg-gradient-to-b from-purple-400/30 to-transparent",
                      slot.color === "green" && "bg-gradient-to-b from-green-400/30 to-transparent",
                      slot.color === "orange" && "bg-gradient-to-b from-orange-400/30 to-transparent"
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
