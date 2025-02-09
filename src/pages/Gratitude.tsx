
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Gratitude = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Flow lístek</h1>
          <p className="text-lg text-white/80">Váš deník vděčnosti</p>
        </section>

        <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Dnešní vděčnost</h2>
            <Button>
              <Plus className="mr-2" size={20} />
              Přidat záznam
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-secondary/50 min-h-[150px] flex items-center justify-center">
              <p className="text-white/50">První věc, za kterou jsem dnes vděčný/á...</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 min-h-[150px] flex items-center justify-center">
              <p className="text-white/50">Druhá věc, za kterou jsem dnes vděčný/á...</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 min-h-[150px] flex items-center justify-center">
              <p className="text-white/50">Třetí věc, za kterou jsem dnes vděčný/á...</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Gratitude;
