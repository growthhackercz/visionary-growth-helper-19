
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Quote, Star, Target, Heart, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

const Vision = () => {
  const [visionSteps, setVisionSteps] = useState({
    quote: "",
    values: "",
    activities: "",
    contribution: "",
    dailyActions: "",
    improvementSteps: "",
    preventionSteps: "",
    utilization: ""
  });

  const handleInputChange = (field: keyof typeof visionSteps, value: string) => {
    setVisionSteps(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Osobní vize</h1>
          <p className="text-lg text-white/80">
            Definujte a vizualizujte svou cestu k lepšímu já
          </p>
        </section>

        <div className="grid gap-6">
          {/* Beta verze osobní vize */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Quote className="text-primary" />
              Beta verze osobní vize
            </h2>
            
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">Jaký je váš nejoblíbenější citát? Jaká myšlenka s vámi silně rezonuje?</label>
                  <Textarea 
                    value={visionSteps.quote}
                    onChange={(e) => handleInputChange("quote", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Napište svůj oblíbený citát..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Jaké jsou vaše tři nejdůležitější životní hodnoty?</label>
                  <Textarea 
                    value={visionSteps.values}
                    onChange={(e) => handleInputChange("values", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Definujte své klíčové hodnoty..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Čemu chcete věnovat čas svého života? Jaké činnosti chcete ideálně dělat?</label>
                  <Textarea 
                    value={visionSteps.activities}
                    onChange={(e) => handleInputChange("activities", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Popište své ideální aktivity..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Jak můžete být užiteční lidské společnosti? Jaké činnosti Ego-2.0 můžete dělat?</label>
                  <Textarea 
                    value={visionSteps.contribution}
                    onChange={(e) => handleInputChange("contribution", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Popište svůj přínos společnosti..."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Nápady na zavedení vize do praxe */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Target className="text-primary" />
              Nápady na zavedení vize do praxe
            </h2>
            
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">Co můžete udělat pro to, abyste vizi používali každý den?</label>
                  <Textarea 
                    value={visionSteps.dailyActions}
                    onChange={(e) => handleInputChange("dailyActions", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Definujte své denní aktivity..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Jaké kroky povedou k tomu, abyste vaši vizi pravidelně vylepšovali?</label>
                  <Textarea 
                    value={visionSteps.improvementSteps}
                    onChange={(e) => handleInputChange("improvementSteps", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Naplánujte kroky ke zlepšení..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Co uděláte pro to, abyste svoji vizi nezapomínali?</label>
                  <Textarea 
                    value={visionSteps.preventionSteps}
                    onChange={(e) => handleInputChange("preventionSteps", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Definujte preventivní opatření..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Co konkrétně budete dělat, abyste svoji vizi naplno využívali?</label>
                  <Textarea 
                    value={visionSteps.utilization}
                    onChange={(e) => handleInputChange("utilization", e.target.value)}
                    className="mt-2 bg-secondary text-white/90"
                    placeholder="Popište konkrétní kroky..."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* SWOT Analýza */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="text-primary" />
              Osobní SWOT
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Star className="text-yellow-500" size={20} />
                  Silné stránky
                </h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Vaše silné stránky..."
                />
              </Card>

              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ArrowRight className="text-red-500" size={20} />
                  Slabé stránky
                </h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Oblasti pro zlepšení..."
                />
              </Card>

              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Target className="text-green-500" size={20} />
                  Příležitosti
                </h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Vaše příležitosti..."
                />
              </Card>

              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Heart className="text-primary" size={20} />
                  Hrozby
                </h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Potenciální překážky..."
                />
              </Card>
            </div>
          </section>

          {/* Analýza motivujících činností */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Star className="text-primary" />
              Analýza motivujících činností
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white">Rozvoj</h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Oblast osobního rozvoje..."
                />
              </Card>

              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white">Odkaz</h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Váš odkaz světu..."
                />
              </Card>

              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white">Vztahy</h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Vztahová oblast..."
                />
              </Card>

              <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
                <h3 className="text-lg font-semibold text-white">Ego 2.0</h3>
                <Textarea 
                  className="h-32 bg-secondary text-white/90"
                  placeholder="Vaše vyšší já..."
                />
              </Card>
            </div>
          </section>

          {/* Seznam osobních úspěchů */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              Seznam osobních úspěchů
            </h2>
            
            <Card className="p-6 space-y-4 backdrop-blur-lg bg-card border-white/10">
              <Textarea 
                className="min-h-[200px] bg-secondary text-white/90"
                placeholder="Zaznamenejte své úspěchy a dosažené milníky..."
              />
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Vision;
