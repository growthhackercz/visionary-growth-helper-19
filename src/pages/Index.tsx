
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckSquare, ListTodo, Calendar, Heart, Trophy, Star, Medal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  const [dailyQuote, setDailyQuote] = useState("");
  
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
    { icon: Medal, text: "7 dní v řadě", color: "text-primary" },
    { icon: Star, text: "150 bodů celkem", color: "text-yellow-500" },
    { icon: Sparkles, text: "3 splněné výzvy", color: "text-blue-400" },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <div className="relative inline-block">
            <h1 className="text-3xl font-bold text-white">Vítejte zpět</h1>
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
          <p className="text-lg text-white/80">{dailyQuote}</p>
        </section>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
              <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
              <span className="text-white">{achievement.text}</span>
            </div>
          ))}
        </div>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/vision">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-semibold text-white">Osobní vize</h2>
              </div>
              <p className="text-white/80">
                Definujte a vizualizujte svou cestu k lepšímu já
              </p>
              <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Otevřít osobní vizi
              </Button>
            </Card>
          </Link>

          <Link to="/habits">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-semibold text-white">Buzer lístek</h2>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>3 ze 5 splněno</span>
                <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-primary rounded-full"></div>
                </div>
              </div>
              <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Otevřít buzer lístek
              </Button>
            </Card>
          </Link>

          <Link to="/todos">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <ListTodo className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-semibold text-white">To-Do-All</h2>
              </div>
              <p className="text-white/80">2 prioritní úkoly dnes</p>
              <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Otevřít úkoly
              </Button>
            </Card>
          </Link>

          <Link to="/weekly">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-semibold text-white">Týdenní reflexe</h2>
              </div>
              <p className="text-white/80">Příští schůzka: Neděle</p>
              <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Otevřít reflexi
              </Button>
            </Card>
          </Link>

          <Link to="/gratitude">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-semibold text-white">Flow lístek</h2>
              </div>
              <p className="text-white/80">Zapište si dnešní vděčnost</p>
              <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Otevřít flow lístek
              </Button>
            </Card>
          </Link>

          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-semibold text-white">Denní výzva</h2>
            </div>
            <p className="text-white/80">Věnuj 5 minut ranní meditaci</p>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Odměna: 25 bodů</span>
              <Button variant="secondary" className="group-hover:bg-primary group-hover:text-white transition-colors">
                Začít výzvu
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </Layout>
  );
}

export default Index;
