
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

const Habits = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Buzer lístek</h1>
          <p className="text-lg text-white/80">Sledujte své každodenní návyky</p>
        </section>

        <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Dnešní návyky</h2>
            <Button>
              <Plus className="mr-2" size={20} />
              Přidat návyk
            </Button>
          </div>

          <div className="space-y-4">
            {/* Demo návyk */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-4">
                <Checkbox id="habit-1" />
                <label htmlFor="habit-1" className="text-white">
                  Ranní cvičení
                </label>
              </div>
              <select className="bg-secondary text-white rounded-md px-2 py-1">
                {[...Array(11)].map((_, i) => (
                  <option key={i} value={i}>
                    {i}/10
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Habits;
