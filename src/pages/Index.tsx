
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckSquare, ListTodo, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { DailyVerse } from "@/components/DailyVerse";
import { BibleReading } from "@/components/BibleReading";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DailyChallenge } from "@/components/dashboard/DailyChallenge";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [dailyQuote, setDailyQuote] = useState("");
  const [progressValues, setProgressValues] = useState({
    habits: 60,
    todos: 40,
    meditation: 75,
    gratitude: 30
  });

  const [userName, setUserName] = useState("uživateli");
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const motivationalPhrases = [
    "Každý malý krok vpřed je vítězství. Jsi na dobré cestě!",
    "Dnes je skvělý den na osobní růst. Věřím v tebe!",
    "Tvé úsilí se vyplácí. Pokračuj dál!",
    "Změna začíná malými kroky. A ty jich děláš spoustu!",
    "Jsi blíž svým cílům než včera. Skvělá práce!",
    "Mindfulness není cíl, je to cesta. A ty jsi na té správné!",
    "Každý moment vědomé přítomnosti je dar sobě samému.",
    "Dnes je perfektní den na to být v přítomnosti.",
    "Malé kroky vedou k velkým změnám. Jsi úžasný/á!",
    "Tvá cesta k lepšímu já začíná právě teď.",
  ];

  const weeklyData = [
    { den: 'Po', splněno: 8, body: 120 },
    { den: 'Út', splněno: 6, body: 90 },
    { den: 'St', splněno: 7, body: 105 },
    { den: 'Čt', splněno: 9, body: 135 },
    { den: 'Pá', splněno: 5, body: 75 },
    { den: 'So', splněno: 4, body: 60 },
    { den: 'Ne', splněno: 7, body: 105 },
  ];

  useEffect(() => {
    setDailyQuote(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const showDailyMotivation = () => {
    const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    toast({
      title: "Dnešní rada od Flowíka",
      description: randomPhrase,
      duration: 5000,
    });
  };

  const categories = [
    {
      title: "Osobní vize",
      description: "Definujte a vizualizujte svou cestu",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/vision",
      progress: null
    },
    {
      title: "Buzer lístek",
      description: "3 ze 5 splněno dnes",
      icon: CheckSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/habits",
      progress: progressValues.habits
    },
    {
      title: "To-Do-All",
      description: "2 prioritní úkoly dnes",
      icon: ListTodo,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      link: "/todos",
      progress: progressValues.todos
    },
    {
      title: "Týdenní reflexe",
      description: "Příští schůzka: Neděle",
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      link: "/weekly",
      progress: null
    },
    {
      title: "Flow lístek",
      description: "Zapište si dnešní vděčnost",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      link: "/gratitude",
      progress: progressValues.gratitude
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <DailyVerse />
        <BibleReading />
        
        <DashboardHeader 
          userName={userName}
          setUserName={setUserName}
          dailyQuote={dailyQuote}
          showDailyMotivation={showDailyMotivation}
        />

        <QuickActions 
          categories={categories}
          showQuickAdd={showQuickAdd}
          setShowQuickAdd={setShowQuickAdd}
        />

        <DailyChallenge />

        <DashboardStats weeklyData={weeklyData} />

        <section className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} px-4`}>
          {categories.map((category, index) => (
            <Link to={category.link} key={index}>
              <Card className={`relative p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:${category.bgColor} transition-colors group`}>
                <div className="flex items-center gap-3">
                  <category.icon className={`w-6 h-6 ${category.color} group-hover:scale-110 transition-transform`} />
                  <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                </div>
                <p className="text-white/80">{category.description}</p>
                {category.progress !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Pokrok</span>
                      <span>{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                )}
                <Button 
                  variant="secondary" 
                  className={`w-full group-hover:${category.color} group-hover:text-white transition-colors`}
                >
                  Otevřít {category.title.toLowerCase()}
                </Button>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export default Index;
