
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Star, Search, CheckCircle, ListChecks, Brain } from "lucide-react";
import { useState } from "react";

const FindingStrengths = () => {
  const [strengths, setStrengths] = useState({
    abilities: "",
    excellence: "",
    betterThan: "",
    adviceSeek: "",
    valuedTraits: ""
  });

  const handleInputChange = (field: keyof typeof strengths, value: string) => {
    setStrengths(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Star className="text-yellow-500 h-8 w-8" />
            Hledání silných stránek
          </h1>
          <p className="text-lg text-white/80">
            Objevte své jedinečné přednosti a talenty
          </p>
        </section>

        <div className="grid gap-6">
          {/* Rozpoznávání silných stránek */}
          <Card className="backdrop-blur-lg bg-card border-white/10">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-primary h-6 w-6" />
                Rozpoznávání silných stránek
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Pocit autentičnosti
                    </h3>
                    <p className="text-white/80 mt-1">
                      Když využíváte svou silnou stránku, cítíte se jako "svůj" - přirozený a autentický.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Pocit vzrušení a radosti
                    </h3>
                    <p className="text-white/80 mt-1">
                      Činnosti spojené s vašimi silnými stránkami vám přinášejí radost a nadšení.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Naučili jste se to rychle
                    </h3>
                    <p className="text-white/80 mt-1">
                      Dovednosti související s vašimi silnými stránkami jste si osvojili snadno a rychle.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Touha najít další využití
                    </h3>
                    <p className="text-white/80 mt-1">
                      Aktivně hledáte další příležitosti k využití této silné stránky.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Při uplatnění se nevyčerpáte
                    </h3>
                    <p className="text-white/80 mt-1">
                      I když je činnost náročná, cítíte se po ní energičtější, ne vyčerpaní.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Podvědomě preferujete související činnost
                    </h3>
                    <p className="text-white/80 mt-1">
                      K činnostem spojeným s vašimi silnými stránkami se přirozeně vracíte.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hledání silných stránek */}
          <Card className="backdrop-blur-lg bg-card border-white/10">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Search className="text-primary h-6 w-6" />
                Hledání silných stránek
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary" />
                    1. Jaké jsou mé schopnosti a dovednosti?
                  </label>
                  <Textarea 
                    value={strengths.abilities}
                    onChange={(e) => handleInputChange("abilities", e.target.value)}
                    className="bg-secondary text-white/90"
                    placeholder="Zapište své schopnosti a dovednosti..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary" />
                    2. V čem vynikám?
                  </label>
                  <Textarea 
                    value={strengths.excellence}
                    onChange={(e) => handleInputChange("excellence", e.target.value)}
                    className="bg-secondary text-white/90"
                    placeholder="V čem jste obzvláště dobří..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary" />
                    3. V čem jsem lepší než moji kolegové?
                  </label>
                  <Textarea 
                    value={strengths.betterThan}
                    onChange={(e) => handleInputChange("betterThan", e.target.value)}
                    className="bg-secondary text-white/90"
                    placeholder="Oblasti, kde vynikáte ve srovnání s ostatními..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary" />
                    4. S čím si ke mně chodí ostatní pro radu?
                  </label>
                  <Textarea 
                    value={strengths.adviceSeek}
                    onChange={(e) => handleInputChange("adviceSeek", e.target.value)}
                    className="bg-secondary text-white/90"
                    placeholder="Témata, ve kterých vyhledávají vaši radu..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white flex items-center gap-2 mb-2">
                    <ListChecks className="h-4 w-4 text-primary" />
                    5. Kterých vlastností si na mně cení mé okolí?
                  </label>
                  <Textarea 
                    value={strengths.valuedTraits}
                    onChange={(e) => handleInputChange("valuedTraits", e.target.value)}
                    className="bg-secondary text-white/90"
                    placeholder="Vlastnosti, za které vás ostatní oceňují..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FindingStrengths;
