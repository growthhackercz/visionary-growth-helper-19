
import { Heart } from "lucide-react";

interface GratitudeStreakProps {
  streak: number;
}

export const GratitudeStreak = ({ streak }: GratitudeStreakProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
        <Heart className="w-5 h-5 text-primary" />
        <span className="text-white">{streak} dní v řadě</span>
      </div>
    </div>
  );
};
