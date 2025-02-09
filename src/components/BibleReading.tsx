
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Calendar, Award, History } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BibleReadingProps {
  currentStreak?: number;
  totalProgress?: number;
  currentReading?: string;
}

export const BibleReading = ({ 
  currentStreak = 771,
  totalProgress = 27.9,
  currentReading = "1. Samuelova 11:3 - 12:16"
}: BibleReadingProps) => {
  const [dailyTip, setDailyTip] = useState("");
  
  const tips = [
    "Najděte jeden verš, který může být užitečný do služby",
    "Prodlužte si dnes modlitbu",
    "Zamyslete se nad jedním principem z dnešního čtení",
    "Snažte se zapamatovat jeden verš z dnešního čtení",
    "Přemýšlejte, jak můžete aplikovat dnešní čtení ve svém životě"
  ];

  useEffect(() => {
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  const nextReadings = [
    {
      passage: "1. Samuelova 4:8-5:12",
      date: "4. 2. 2025",
      task: "Zjistěte, jakého časového období se tato kapitola týká."
    },
    {
      passage: "1. Samuelova 6:1-7:8",
      date: "5. 2. 2025",
      task: "Přečtěte text nahlas."
    },
    {
      passage: "1. Samuelova 7:9-8:22",
      date: "6. 2. 2025",
      task: "Najděte v dnešním čtení biblický princip."
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 flex items-center justify-center flex-col bg-blue-500/10">
          <Calendar className="w-8 h-8 mb-2 text-blue-500" />
          <span className="text-3xl font-bold">{currentStreak}</span>
          <span className="text-sm text-gray-500">Dny za sebou</span>
        </Card>
        
        <Card className="p-6 flex items-center justify-center flex-col bg-green-500/10">
          <Award className="w-8 h-8 mb-2 text-green-500" />
          <span className="text-3xl font-bold">23/23</span>
          <span className="text-sm text-gray-500">Splněno tento měsíc</span>
        </Card>

        <Card className="p-6 flex items-center justify-center flex-col bg-orange-500/10">
          <History className="w-8 h-8 mb-2 text-orange-500" />
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Celkový pokrok</span>
              <span>{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Aktuální čtení</h2>
        <div className="space-y-4">
          {nextReadings.map((reading, index) => (
            <Card key={index} className="p-4 bg-black/5 hover:bg-black/10 transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-blue-400" />
                    <h3 className="font-semibold">{reading.passage}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{reading.task}</p>
                </div>
                <span className="text-sm text-gray-500">{reading.date}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://www.jw.org/finder?srcid=jwlshare&wtlocale=B&prefer=lang&bible=${reading.passage.replace(/\s/g, '')}&pub=nwt`, '_blank')}
                >
                  Otevřít v JW Library
                </Button>
                <Button variant="outline" size="sm">
                  Označit jako přečtené
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-blue-500/5 border-blue-500/20">
        <h3 className="text-lg font-semibold mb-2">Denní tip</h3>
        <p className="text-gray-600">{dailyTip}</p>
      </Card>
    </div>
  );
};
