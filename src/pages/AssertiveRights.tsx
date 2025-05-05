
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

const rightsList = [
  {
    number: 1,
    title: "SAMI POSUZOVAT SVÉ VLASTNÍ CITY A CHOVÁNÍ A BÝT ZA NĚ ZODPOVĚDNÍ",
    description: "Máme právo sami se rozhodnout, co cítíme a jak se chováme, bez potřeby schválení ostatních. Zároveň musíme přijmout zodpovědnost za důsledky našich emocí a činů."
  },
  {
    number: 2,
    title: "NENABÍZET ŽÁDNÉ OMLUVY A VÝMLUVY OSPRAVEDLŇUJÍCÍ NAŠE CHOVÁNÍ",
    description: "Máme právo jednat podle vlastních přesvědčení, aniž bychom museli vysvětlovat, proč jsme se rozhodli tak, jak jsme se rozhodli."
  },
  {
    number: 3,
    title: "POSOUDIT ZDA A NAKOLIK JSME ZODPOVĚDNÍ ZA ŘEŠENÍ PROBLÉMŮ DRUHÝCH LIDÍ",
    description: "Máme právo rozhodnout se, do jaké míry jsme ochotni pomáhat ostatním s jejich problémy, a určit hranice svého zapojení."
  },
  {
    number: 4,
    title: "ZMĚNIT SVŮJ NÁZOR",
    description: "Máme právo změnit své myšlenky, přesvědčení a rozhodnutí na základě nových informací nebo změny okolností."
  },
  {
    number: 5,
    title: "ŘÍCT \"JÁ NEVÍM\"",
    description: "Máme právo přiznat, že něco nevíme nebo si nejsme jistí, aniž bychom se cítili méněcenní."
  },
  {
    number: 6,
    title: "BÝT NEZÁVISLÍ NA DOBRÉ VŮLI OSTATNÍCH",
    description: "Máme právo činit rozhodnutí nezávisle na tom, zda budou schválena nebo podpořena ostatními lidmi."
  },
  {
    number: 7,
    title: "DĚLAT CHYBY A BÝT ZA NĚ ZODPOVĚDNÍ",
    description: "Máme právo udělat chybu, přiznat ji a nést za ni zodpovědnost, aniž bychom se cítili méněcenní."
  },
  {
    number: 8,
    title: "DĚLAT NELOGICKÁ ROZHODNUTÍ",
    description: "Máme právo činit rozhodnutí, která jiní mohou považovat za iracionální nebo nelogická, pokud jsou v souladu s našimi potřebami a hodnotami."
  },
  {
    number: 9,
    title: "ŘÍCT \"NEROZUMÍM.\" \"JE MI TO JEDNO.\"",
    description: "Máme právo upřímně vyjádřit nedostatek porozumění nebo zájmu bez pocitu viny."
  },
  {
    number: 10,
    title: "ROZHODNOUT SE, ZDA CHCI JEDNAT ASERTIVNĚ",
    description: "Máme právo zvolit si, kdy chceme uplatňovat asertivní práva a kdy ne, podle vlastního uvážení a situace."
  }
];

const AssertiveRights = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Shield className="text-primary h-8 w-8" />
            Asertivní práva
          </h1>
          <p className="text-lg text-white/80">
            Máme právo respektovat sebe i ostatní
          </p>
        </section>

        <div className="grid gap-6">
          {rightsList.map((right) => (
            <Card key={right.number} className="backdrop-blur-lg bg-card border-white/10 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-primary text-white font-bold text-2xl p-6 flex items-center justify-center md:w-24">
                  {right.number}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2">{right.title}</h2>
                  <p className="text-white/80">{right.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AssertiveRights;
