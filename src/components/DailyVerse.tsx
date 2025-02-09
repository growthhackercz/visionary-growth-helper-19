
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const DailyVerse = () => {
  const [verse, setVerse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyText = async () => {
      try {
        const response = await fetch("https://wol.jw.org/cs/wol/h/r29/lp-b");
        const html = await response.text();
        // Toto je zjednodušená implementace - v reálném případě
        // by bylo potřeba správně naparsovat HTML a získat text
        setVerse("Denní text bude zde - je potřeba implementovat parser");
      } catch (error) {
        console.error("Chyba při načítání denního textu:", error);
        setVerse("Nepodařilo se načíst denní text");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyText();
  }, []);

  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">Denní text</h2>
          <p className="text-gray-600">{loading ? "Načítání..." : verse}</p>
        </div>
        <a 
          href="https://wol.jw.org/cs/wol/h/r29/lp-b" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </Card>
  );
};
