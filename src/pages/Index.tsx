import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckSquare, ListTodo, Calendar, Heart, Trophy, Star, Medal, Sparkles, ArrowRight, Plus, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DailyVerse } from "@/components/DailyVerse";
import { BibleReading } from "@/components/BibleReading";

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

  const handleQuickAdd = (type: string) => {
    toast({
      title: "Rychlé přidání",
      description: `Přidáno do sekce ${type}`,
      duration: 3000,
    });
    setShowQuickAdd(false);
  };

  const achievements = [
    { 
      icon: Medal, 
      text: "7 dní v řadě", 
      color: "text-primary", 
      bgColor: "bg-primary/10",
      description: "Pokračuj v sérii!"
    },
    { 
      icon: Star, 
      text: "150 bodů celkem", 
      color: "text-yellow-500", 
      bgColor: "bg-yellow-500/10",
      description: "+15 bodů tento týden"
    },
    { 
      icon: Sparkles, 
      text: "3 splněné výzvy", 
      color: "text-blue-400", 
      bgColor: "bg-blue-400/10",
      description: "Nová výzva za 2 dny"
    },
  ];

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

  const renderStatisticsCharts = () => (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 mt-8`}>
      <Card className="p-6 backdrop-blur-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">Týdenní aktivita</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="den" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#333',
                  border: '1px solid #666',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="splněno" fill="#ea384c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">Body za týden</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="den" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#333',
                  border: '1px solid #666',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="body" stroke="#ea384c" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <DailyVerse />
        <BibleReading />
        
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors z-50"
        >
          <Plus className="w-6 h-6" />
        </button>

        {showQuickAdd && (
          <div className="fixed bottom-24 right-6 bg-card rounded-lg shadow-lg p-4 space-y-2 z-50 animate-fade-in w-64 max-w-[calc(100vw-3rem)]">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleQuickAdd(category.title)}
                className={`flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent transition-colors ${category.color}`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm">{category.title}</span>
              </button>
            ))}
          </div>
        )}

        <section className="text-center space-y-4 px-4">
          <div className="relative inline-block">
            <div className="flex items-center justify-center gap-4">
              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent`}>
                Vítej zpět, {userName}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => {
                      const newName = prompt("Zadejte své jméno:");
                      if (newName) {
                        setUserName(newName);
                        localStorage.setItem("userName", newName);
                        toast({
                          title: "Jméno bylo změněno",
                          description: `Vítej, ${newName}!`,
                        });
                      }
                    }}
                  >
                    Změnit jméno
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div 
              className="absolute -right-16 -top-12 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group" 
              onClick={showDailyMotivation}
            >
              <img 
                src="/mascot.svg" 
                alt="Flowík" 
                className="w-16 h-16 group-hover:animate-bounce" 
              />
            </div>
          </div>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white/80 max-w-2xl mx-auto`}>{dailyQuote}</p>
        </section>

        <div className="flex items-center justify-center gap-3 flex-wrap px-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`group relative flex items-center gap-2 ${achievement.bgColor} px-3 py-2 rounded-full transition-transform hover:scale-105 cursor-pointer ${isMobile ? 'text-sm' : ''}`}
            >
              <achievement.icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${achievement.color}`} />
              <span className="text-white">{achievement.text}</span>
              
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {achievement.description}
              </div>
            </div>
          ))}
        </div>

        <Card className="p-6 backdrop-blur-lg bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10 transition-colors mx-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <h2 className="text-xl font-semibold text-white">Denní výzva</h2>
                <p className="text-white/80">Věnuj 5 minut ranní meditaci</p>
              </div>
            </div>
            <Button variant="secondary" className="hover:bg-yellow-500 hover:text-white transition-colors">
              Začít výzvu
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>

        {renderStatisticsCharts()}

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
