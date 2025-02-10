
import { Card } from "@/components/ui/card";

interface GratitudeEntry {
  id: string;
  entry_date: string;
  entry_1: string | null;
  entry_2: string | null;
  entry_3: string | null;
}

interface GratitudeHistoryProps {
  entries: GratitudeEntry[];
}

export const GratitudeHistory = ({ entries }: GratitudeHistoryProps) => {
  if (!entries || entries.length === 0) return null;

  return (
    <Card className="p-6 space-y-6 backdrop-blur-lg bg-card border-white/10">
      <h2 className="text-xl font-semibold text-white">Historie vděčnosti</h2>
      <div className="space-y-4">
        {entries.map((entry: GratitudeEntry) => (
          <div key={entry.id} className="p-4 rounded-lg bg-secondary/30">
            <div className="text-sm text-white/60 mb-2">
              {new Date(entry.entry_date).toLocaleDateString('cs-CZ')}
            </div>
            <ul className="list-disc list-inside space-y-1 text-white/80">
              {entry.entry_1 && <li>{entry.entry_1}</li>}
              {entry.entry_2 && <li>{entry.entry_2}</li>}
              {entry.entry_3 && <li>{entry.entry_3}</li>}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};
