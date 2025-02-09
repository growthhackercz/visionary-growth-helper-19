
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const Vision = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Osobní vize</h1>
          <p className="text-lg text-white/80">
            Definujte a vizualizujte svou cestu k lepšímu já
          </p>
        </section>

        <div className="grid gap-6">
          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Moje vize</h2>
            <textarea
              className="w-full h-32 p-3 rounded-lg bg-secondary text-white/90 resize-none"
              placeholder="Popište svou osobní vizi..."
            />
            <div className="flex justify-between items-center">
              <Button className="flex gap-2">
                <Upload size={20} />
                Nahrát obrázek vize
              </Button>
              <Button>Uložit vizi</Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Moodboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px] bg-secondary/50 rounded-lg p-4">
              <div className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center">
                <Upload className="text-white/30" size={32} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Vision;
