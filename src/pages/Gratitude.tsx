
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Gratitude = () => {
  const { toast } = useToast();

  const handleAddGratitude = () => {
    toast({
      title: "Skvělá práce!",
      description: "Vděčnost je klíčem ke spokojenosti. Získáváš 15 bodů!",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Flow lístek</h1>
          <p className="text-lg text-white/80">Váš deník vděčnosti</p>
        </section>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-white">5 dní v řadě</span>
          </div>
        </div>

        <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Dnešní vděčnost</h2>
            <Button onClick={handleAddGratitude}>
              <Plus className="mr-2" size={20} />
              Přidat záznam
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="group p-4 rounded-lg bg-secondary/50 min-h-[150px] flex items-center justify-center hover:bg-secondary/60 transition-colors cursor-pointer">
              <p className="text-white/50 group-hover:text-white/80 transition-colors">První věc, za kterou jsem dnes vděčný/á...</p>
            </div>
            <div className="group p-4 rounded-lg bg-secondary/50 min-h-[150px] flex items-center justify-center hover:bg-secondary/60 transition-colors cursor-pointer">
              <p className="text-white/50 group-hover:text-white/80 transition-colors">Druhá věc, za kterou jsem dnes vděčný/á...</p>
            </div>
            <div className="group p-4 rounded-lg bg-secondary/50 min-h-[150px] flex items-center justify-center hover:bg-secondary/60 transition-colors cursor-pointer">
              <p className="text-white/50 group-hover:text-white/80 transition-colors">Třetí věc, za kterou jsem dnes vděčný/á...</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Gratitude;

