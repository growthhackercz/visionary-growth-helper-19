
import { Input } from "@/components/ui/input";

interface GratitudeFormInputsProps {
  entries: [string, string, string];
  onInputChange: (index: number, value: string) => void;
}

export const GratitudeFormInputs = ({ entries, onInputChange }: GratitudeFormInputsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <div key={index} className="space-y-2">
          <Input
            value={entries[index]}
            onChange={(e) => onInputChange(index, e.target.value)}
            placeholder={`${index + 1}. věc, za kterou jsem dnes vděčný/á...`}
            className="bg-secondary/50 border-white/10 text-white placeholder:text-white/50"
          />
        </div>
      ))}
    </div>
  );
};
