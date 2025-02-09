
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const Weekly = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Týdenní reflexe</h1>
          <p className="text-lg text-white/80">Pravidelné schůzky sám se sebou</p>
        </section>

        <div className="grid gap-6">
          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Dnešní reflexe</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-white">Kam jste se od poslední schůzky posunuli?</label>
                <Textarea className="min-h-[100px] bg-secondary text-white" placeholder="Napište svou odpověď..." />
              </div>
              <div className="space-y-2">
                <label className="text-white">Kam se chcete posunout příště?</label>
                <Textarea className="min-h-[100px] bg-secondary text-white" placeholder="Napište svou odpověď..." />
              </div>
              <div className="space-y-2">
                <label className="text-white">Jak využíváte metody? (1-10)</label>
                <input type="range" min="1" max="10" className="w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-white">Co udělat do příště?</label>
                <Textarea className="min-h-[100px] bg-secondary text-white" placeholder="Napište svou odpověď..." />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Weekly;
