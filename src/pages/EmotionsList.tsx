
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const positiveEmotions = [
  "AKTIVNÍ", "BÁJEČNĚ", "BEZ DECHU", "BEZPEČNĚ", "BEZSTAROSTNĚ", "BUJAŘE", "CÍTÍME DŮVĚRU", "CÍTÍME NADĚJI",
  "CÍTÍME ÚLEVU", "CITLIVĚ", "ČILE", "DOJATÍ", "FAJN", "FASCINOVANĚ", "HEZKY", "HRDĚ", "INSPIROVANÍ", "JISTĚ", "KLIDNĚ",
  "LÁSKYPLNĚ", "NÁDHERNĚ", "NADŠENĚ", "NAPLNĚNÍ", "NAPNUTÍ", "NEKLIDNÍ", "NESPOUTANÍ", "NETRPĚLIVÍ",
  "NEVÁZANĚ", "ODHODLANĚ", "ODPOČINUTÍ", "ODVÁŽNĚ", "OHROMENI", "OKOUZLENĚ", "ODPŘOŠTĚNĚ",
  "OPTIMISTICKY", "OSLNENI", "OSVĚŽENI", "OSVOBOZENÍ", "OŽIVENÍ", "PLNI ENERGIE", "PLNI CHUTI", "PLNI NĚHY",
  "PLNI SÍLY", "POBAVENĚ", "PODNÍCENI", "POHLCENI", "POHNUTĚ", "POKLIDNĚ", "POSÍLENI", "POTĚŠENI", "POVZBUZENI",
  "PRIMA", "PROSPĚŠNÍ", "PŘÁTELSKY NAKLONĚNI", "PŘEKRÁSNĚ", "PŘEKVAPENĚ", "PŘEŠŤASTNĚ", "PŘÍJEMNĚ", "PYŠNĚ",
  "RADOSTNĚ", "ROZDOVÁDĚNĚ", "ROZJAŘENÍ", "ROZJÁSANĚ", "ROZPUSTILE", "ROZRADOSTNĚLE", "ROZRUŠENĚ",
  "ROZVESELENĚ", "ROZZÁŘENĚ", "SILNĚ", "SDÍLNĚ", "SEBEJISTĚ", "SENZAČNĚ", "SKVĚLE", "SLASTNĚ", "SLIBNĚ",
  "SPOKOJENĚ", "SVOBODNĚ", "ŠŤASTNĚ", "U VYTRŽENÍ", "ÚČASTNĚ", "UDIVENĚ", "UCHVÁCENĚ", "UNESENĚ",
  "USPOKOJENĚ", "UVOLNĚNĚ", "UŽASLE", "ÚŽASNĚ", "UŽITEČNĚ", "V DOBRÉ NÁLADĚ", "V POHODĚ", "VÁŠNIVĚ", "VDĚČNĚ",
  "VESELE", "VE STŘEHU", "VÍTĚZOSLAVNĚ", "VOLNĚ", "VROUCNĚ", "VESELE", "VYROVNANĚ", "VZPRUŽENĚ", "VZRUŠENĚ",
  "ZAMILOVANĚ", "ZAUJATĚ", "ZÚČASTNĚNĚ", "ZVĚDAVĚ", "ŽIVĚ"
];

const negativeEmotions = [
  "APATICKY", "BEZBRANNĚ", "BEZNADĚJNĚ", "BÍDNĚ", "CÍTÍME PANIKU", "CÍTÍME LÍTOST", "CÍTÍME OBAVY", "DEPRESIVNĚ",
  "DEPRIMOVANĚ", "DOPÁLENĚ", "DOTČENĚ", "DUCHEM NEPŘÍTOMNĚ", "FRUSTROVANĚ", "HANEBNĚ", "HROZNĚ",
  "CHLADNĚ", "INDIFERENTNĚ", "LABILNĚ", "LHOSTEJNĚ", "LÍNĚ", "MARNĚ", "MDLE", "MELANCHOLICKY", "MIZERNĚ",
  "MRZUTĚ", "NABRUCENĚ", "NAKVAŠENĚ", "NICOTNĚ", "NASUPENĚ", "NAŠTVANĚ", "NEDŮTKLIVĚ", "NEDŮVĚŘIVĚ",
  "NEKLIDNĚ", "NEOCHOTNĚ", "NEPOČTIVĚ", "NEPOHODLNĚ", "NEPOKOJNĚ", "NEROZHODNĚ", "NERUDNĚ", "NERVÓZNĚ",
  "NESPOKOJENĚ", "NEŠŤASTNĚ", "NETEČNĚ", "NETRPĚLIVĚ", "NEVRAŽIVĚ", "NEVRLE", "NEZÚČASTNĚNĚ", "NOSTALGICKY",
  "OCHABLE", "OCHROMENĚ", "OPUŠTĚNĚ", "OSAMĚLE", "OSPALE", "OTRÁVENĚ", "OTUPĚLE", "PASIVNĚ", "PESIMISTICKY",
  "PODEZÍRAVĚ", "PODRÁŽDĚNÍ", "POKOŘENI", "POPLETENI", "POPUZENI", "PROTIVNĚ", "PROVINILE", "PŘECITLIVĚLE",
  "PŘEKVAPENĚ", "RANĚNI", "ROZČAROVANÍ", "ROZCÍLENI", "ROZHÁRANĚ", "ROZHNĚVÁNI", "ROZHOŘČENI",
  "ROZLADĚNĚ", "ROZHRZENĚ", "ROZPAČITĚ", "ROZRUŠENĚ", "ROZTĚKANĚ", "ROZTRPČENI", "ROZTRŽITĚ", "ROZZLOBENI",
  "ROZZUŘENI", "SKEPTICKY", "SKLESLE", "SKLÍČENĚ", "SLABĚ", "SMUTNĚ", "STÍSNĚNĚ", "STRAŠNĚ", "STRNULE",
  "ŠOKOVANĚ", "ŠPATNĚ NALADĚNÍ", "TESKLIVĚ", "TÍŽIVĚ", "UBOZE", "UNAVENĚ", "USTARANĚ", "UTAHANĚ", "UVEDENI DO ROZPAKU", 
  "ÚZKOSTLIVĚ", "VÁHAVĚ", "VLAŽNĚ", "VYBURCOVANÍ", "VYČERPANÍ", "VYDĚŠENÍ", "VYDRÁŽDĚNÍ",
  "VYLEKANÍ", "VYNERVOVANÍ", "VYPLAŠENÍ", "VYSÍLENÍ", "VYSTRAŠENÍ", "VYVEDENI Z ROVNOVÁHY", "VZBOUŘENÍ",
  "VZNÍCENÍ", "ZAHANBENÍ", "ZAHOŘKLÍ", "ZARAŽENÍ", "ZARMOUCENÍ", "ZASMUŠILE", "ZÁVISTIVĚ", "ZBAVENI ILUZÍ",
  "ZDEPTANÍ", "ZDRÁHAVĚ", "ZDRCENÍ", "ZHNUSENÍ", "ZKLAMANÍ", "ZLOSTNĚ", "ZMATENÍ", "ZNECHUCENÍ", "ZNEKLIDNĚNÍ",
  "ZNEPOKOJENÍ", "ZNUDĚNÍ", "ZOUFALE", "ZVIKLANĚ", "ŽALOSTNĚ", "ŽÁRLIVĚ"
];

// Group emotions in chunks for better display
const chunkArray = (array: string[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

const positiveEmotionsChunked = chunkArray(positiveEmotions, 4);
const negativeEmotionsChunked = chunkArray(negativeEmotions, 4);

const EmotionsList = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Heart className="text-red-500 h-8 w-8" />
            Seznam pocitů
          </h1>
          <p className="text-lg text-white/80">
            Pro rozšíření škály pojmenování emocí
          </p>
        </section>

        <Card className="backdrop-blur-lg bg-card border-white/10">
          <CardContent className="p-6">
            <Tabs defaultValue="positive" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="positive" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Když jsou potřeby uspokojeny
                </TabsTrigger>
                <TabsTrigger value="negative" className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4" />
                  Když potřeby nejsou uspokojeny
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="positive" className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ThumbsUp className="text-green-500 h-6 w-6" />
                  Jak se cítíme, když naše potřeby jsou uspokojeny
                </h2>
                
                <div className="grid gap-4">
                  {positiveEmotionsChunked.map((chunk, index) => (
                    <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {chunk.map((emotion, emotionIndex) => (
                        <div
                          key={emotionIndex}
                          className="bg-green-950/20 border border-green-900/30 text-white/90 px-3 py-2 rounded-md text-center hover:bg-green-950/40 transition-colors"
                        >
                          {emotion}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="negative" className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ThumbsDown className="text-red-500 h-6 w-6" />
                  Jak se cítíme, když naše potřeby nejsou uspokojeny
                </h2>
                
                <div className="grid gap-4">
                  {negativeEmotionsChunked.map((chunk, index) => (
                    <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {chunk.map((emotion, emotionIndex) => (
                        <div
                          key={emotionIndex}
                          className="bg-red-950/20 border border-red-900/30 text-white/90 px-3 py-2 rounded-md text-center hover:bg-red-950/40 transition-colors"
                        >
                          {emotion}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmotionsList;
