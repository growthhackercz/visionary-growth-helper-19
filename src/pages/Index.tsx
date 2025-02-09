
import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { DailyVerse } from "@/components/DailyVerse";
import { BibleReading } from "@/components/BibleReading";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DailyChallenge } from "@/components/dashboard/DailyChallenge";
import { DashboardCategories } from "@/components/dashboard/DashboardCategories";
import { Brain, CheckSquare, ListTodo, Calendar, Heart } from "lucide-react";

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
      icon: Brain,
      color: "text-purple-500",
    },
    {
      title: "Buzer lístek",
      icon: CheckSquare,
      color: "text-green-500",
    },
    {
      title: "To-Do-All",
      icon: ListTodo,
      color: "text-blue-500",
    },
    {
      title: "Týdenní reflexe",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      title: "Flow lístek",
      icon: Heart,
      color: "text-pink-500",
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

        <DashboardCategories 
          progressValues={progressValues}
          isMobile={isMobile}
        />
      </div>
    </Layout>
  );
}

export default Index;
