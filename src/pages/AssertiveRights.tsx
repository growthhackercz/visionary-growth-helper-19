
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Check, Heart, User, ListChecks } from "lucide-react";

const assertiveRights = [
  {
    number: 1,
    text: "SAMI POSUZOVAT SVÉ VLASTNÍ CITY A CHOVÁNÍ A BÝT ZA NE ZODPOVĚDNÍ."
  },
  {
    number: 2,
    text: "NENABÍZET ŽÁDNÉ OMLUVY A VÝMLUVY OSPRAVEDLNUJÍCÍ NAŠE CHOVÁNÍ."
  },
  {
    number: 3,
    text: "POSOUDIT ZDA A NAKOLIK JSME ZODPOVĚDNÍ ZA ŘEŠENÍ PROBLÉMŮ DRUHÝCH LIDÍ."
  },
  {
    number: 4,
    text: "ZMĚNIT SVŮJ NÁZOR."
  },
  {
    number: 5,
    text: "ŘÍCT „JÁ NEVÍM"."
  },
  {
    number: 6,
    text: "BÝT NEZÁVISLÍ NA DOBRÉ VŮLI OSTATNÍCH."
  },
  {
    number: 7,
    text: "DĚLAT CHYBY A BÝT ZA NĚ ZODPOVĚDNÍ."
  },
  {
    number: 8,
    text: "DĚLAT NELOGICKÁ ROZHODNUTÍ."
  },
  {
    number: 9,
    text: "ŘÍCT „NEROZUMÍM." „JE MI TO JEDNO.""
  },
  {
    number: 10,
    text: "ROZHODNOUT SE, ZDA CHCI JEDNAT ASERTIVNĚ."
  }
];

export default function AssertiveRights() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">Asertivní práva</h1>
          </div>
          
          <p className="text-white/70 text-lg">
            Asertivní práva jsou základem zdravé komunikace a osobních hranic. Pomáhají nám uvědomit si, 
            že máme právo být sami sebou a prosazovat své potřeby způsobem, který respektuje ostatní.
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-blue-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <ListChecks className="w-6 h-6 text-purple-400" />
              MÁME PRÁVO:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {assertiveRights.map((right) => (
                <div 
                  key={right.number}
                  className="p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex gap-4 items-start">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 font-bold group-hover:bg-purple-500/30 transition-colors">
                      {right.number}
                    </div>
                    <p className="text-white font-medium leading-tight pt-1">
                      {right.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1 backdrop-blur-lg bg-gradient-to-br from-blue-500/10 to-blue-400/5 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Proč jsou asertivní práva důležitá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                Asertivní práva nám připomínají, že naše potřeby a pocity jsou stejně důležité jako potřeby ostatních. 
                Pomáhají nám najít rovnováhu mezi agresivitou a pasivitou při komunikaci s ostatními.
              </p>
            </CardContent>
          </Card>

          <Card className="flex-1 backdrop-blur-lg bg-gradient-to-br from-pink-500/10 to-purple-400/5 border-pink-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Jak je používat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                Připomínejte si tato práva, když se cítíte pod tlakem nebo v situacích, 
                kdy máte tendenci obětovat své potřeby. Použijte je jako mantru pro posílení 
                sebevědomí a zdravých hranic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
