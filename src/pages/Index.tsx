
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckSquare, ListTodo, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Vítejte zpět</h1>
          <p className="text-lg text-white/80">Pokračujte ve svém osobním růstu</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/vision">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-white">Osobní vize</h2>
              </div>
              <p className="text-white/80">
                Definujte a vizualizujte svou cestu k lepšímu já
              </p>
              <Button variant="secondary" className="w-full">
                Otevřít osobní vizi
              </Button>
            </Card>
          </Link>

          <Link to="/habits">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-white">Buzer lístek</h2>
              </div>
              <p className="text-white/80">3 ze 5 splněno</p>
              <Button variant="secondary" className="w-full">
                Otevřít buzer lístek
              </Button>
            </Card>
          </Link>

          <Link to="/todos">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <ListTodo className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-white">To-Do-All</h2>
              </div>
              <p className="text-white/80">2 prioritní úkoly dnes</p>
              <Button variant="secondary" className="w-full">
                Otevřít úkoly
              </Button>
            </Card>
          </Link>

          <Link to="/weekly">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-white">Týdenní reflexe</h2>
              </div>
              <p className="text-white/80">Příští schůzka: Neděle</p>
              <Button variant="secondary" className="w-full">
                Otevřít reflexi
              </Button>
            </Card>
          </Link>

          <Link to="/gratitude">
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-white">Flow lístek</h2>
              </div>
              <p className="text-white/80">Zapište si dnešní vděčnost</p>
              <Button variant="secondary" className="w-full">
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
