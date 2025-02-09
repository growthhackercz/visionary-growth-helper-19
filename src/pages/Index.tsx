
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckSquare, ListTodo, Calendar, Heart, Trophy, Star, Medal, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const { toast } = useToast();
  const [dailyQuote, setDailyQuote] = useState("");
  const [progressValues, setProgressValues] = useState({
    habits: 60,
    todos: 40,
    meditation: 75,
    gratitude: 30
  });
  
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

  useEffect(() => {
    setDailyQuote(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
  }, []);

  const showDailyMotivation = () => {
    const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    toast({
      title: "Dnešní rada od Flowíka",
      description: randomPhrase,
      duration: 5000,
    });
  };

  const achievements = [
    { icon: Medal, text: "7 dní v řadě", color: "text-primary", bgColor: "bg-primary/10" },
    { icon: Star, text: "150 bodů celkem", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
    { icon: Sparkles, text: "3 splněné výzvy", color: "text-blue-400", bgColor: "bg-blue-400/10" },
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

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header Section */}
        <section className="text-center space-y-4">
          <div className="relative inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Vítejte zpět
            </h1>
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
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{dailyQuote}</p>
        </section>

        {/* Achievements Section */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-2 ${achievement.bgColor} px-4 py-2 rounded-full transition-transform hover:scale-105`}
            >
              <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
              <span className="text-white">{achievement.text}</span>
            </div>
          ))}
        </div>

        {/* Daily Challenge Card */}
        <Card className="p-6 backdrop-blur-lg bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10 transition-colors">
          <div className="flex items-center justify-between">
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

        {/* Main Categories Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link to={category.link} key={index}>
              <Card className={`p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:${category.bgColor} transition-colors group`}>
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
