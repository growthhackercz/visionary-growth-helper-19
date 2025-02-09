
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckSquare, ListTodo, Calendar, Heart, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  const showDailyMotivation = () => {
    toast({
      title: "Dnešní rada od Flowíka",
      description: "Každý malý krok vpřed je vítězství. Jsi na dobré cestě!",
      duration: 5000,
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <div className="relative inline-block">
            <h1 className="text-3xl font-bold text-white">Vítejte zpět</h1>
            <div className="absolute -right-16 -top-12 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" onClick={showDailyMotivation}>
              <img src="/mascot.svg" alt="Flowík" className="w-16 h-16" />
            </div>
          </div>
          <p className="text-lg text-white/80">Pokračujte ve svém osobním růstu</p>
        </section>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-white">7 dní v řadě</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-white">150 bodů</span>
          </div>
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
        </section>
      </div>
    </Layout>
  );
}

export default Index;
