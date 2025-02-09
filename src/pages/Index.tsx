
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Vítejte zpět</h1>
          <p className="text-lg text-white/80">Pokračujte ve svém osobním růstu</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Osobní vize</h2>
            <p className="text-white/80">
              "Být lepší verzí sebe sama každý den"
            </p>
          </Card>

          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Dnešní návyky</h2>
            <p className="text-white/80">3 ze 5 splněno</p>
          </Card>

          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Úkoly</h2>
            <p className="text-white/80">2 prioritní úkoly dnes</p>
          </Card>

          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Týdenní reflexe</h2>
            <p className="text-white/80">Příští schůzka: Neděle</p>
          </Card>

          <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
            <h2 className="text-xl font-semibold text-white">Flow lístek</h2>
            <p className="text-white/80">Zapište si dnešní vděčnost</p>
          </Card>
        </section>
      </div>
    </Layout>
  );
}

export default Index;
