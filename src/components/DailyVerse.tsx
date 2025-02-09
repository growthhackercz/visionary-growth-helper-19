
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DailyVerse = () => {
  const [verse, setVerse] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDailyText = async () => {
      try {
        // Poznámka: Přímé načítání z wol.jw.org není možné kvůli CORS
        // Pro skutečnou implementaci by bylo potřeba:
        // 1. Vytvořit backend proxy server
        // 2. Nebo použít oficiální API pokud existuje
        // 3. Nebo ukládat denní texty lokálně
        setVerse("Pro zobrazení denního textu prosím navštivte wol.jw.org");
        toast({
          title: "Informace",
          description: "Pro zobrazení denního textu budete přesměrováni na oficiální stránky",
        });
      } catch (error) {
        console.error("Chyba při načítání denního textu:", error);
        setVerse("Nepodařilo se načíst denní text");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyText();
  }, []);

  const handleExternalLinkClick = () => {
    window.open("https://wol.jw.org/cs/wol/h/r29/lp-b", "_blank");
  };

  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">Denní text</h2>
          <p className="text-gray-600">{loading ? "Načítání..." : verse}</p>
        </div>
        <button 
          onClick={handleExternalLinkClick}
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};
