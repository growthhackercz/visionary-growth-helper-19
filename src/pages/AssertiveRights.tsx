
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-8">
        <section className="text-center space-y-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl -z-10 blur-xl"></div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4"
          >
            <Shield className="text-primary h-8 w-8" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
          >
            Asertivní práva
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/80 max-w-lg mx-auto"
          >
            Máme právo respektovat sebe i ostatní
          </motion.p>
        </section>

        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {rightsList.map((right) => (
            <motion.div key={right.number} variants={itemVariants}>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden transition-all hover:border-primary/30 hover:bg-white/7 card-shine">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white font-bold text-2xl p-6 flex items-center justify-center md:w-24">
                    {right.number}
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-3">{right.title}</h2>
                    <p className="text-white/80 leading-relaxed">{right.description}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default AssertiveRights;
