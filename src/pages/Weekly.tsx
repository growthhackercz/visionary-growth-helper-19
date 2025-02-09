
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Weekly = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Reflexe uložena",
      description: "Skvělá práce! Získáváš 50 bodů za týdenní reflexi.",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Týdenní reflexe</h1>
          <p className="text-lg text-white/80">Pravidelné schůzky sám se sebou</p>
        </section>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-white">4 týdny v řadě</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-white">300 bodů celkem</span>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Dnešní reflexe</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-white">Kam jste se od poslední schůzky posunuli?</label>
                <Textarea 
                  className="min-h-[100px] bg-secondary text-white" 
                  placeholder="Napište svou odpověď..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-white">Kam se chcete posunout příště?</label>
                <Textarea 
                  className="min-h-[100px] bg-secondary text-white" 
                  placeholder="Napište svou odpověď..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-white">Jak využíváte metody? (1-10)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  className="w-full accent-primary bg-secondary h-2 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white">Co udělat do příště?</label>
                <Textarea 
                  className="min-h-[100px] bg-secondary text-white" 
                  placeholder="Napište svou odpověď..."
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                Uložit reflexi
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Weekly;

