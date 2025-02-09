
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Todos = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">To-Do-All</h1>
          <p className="text-lg text-white/80">Vizualizujte a plánujte své úkoly</p>
        </section>

        <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Dnešní úkoly</h2>
            <Button>
              <Plus className="mr-2" size={20} />
              Naplánovat úkol
            </Button>
          </div>

          <div className="min-h-[300px] bg-secondary/50 rounded-lg p-4 flex items-center justify-center">
            <p className="text-white/50">Zatím žádné úkoly na dnešek</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Todos;
