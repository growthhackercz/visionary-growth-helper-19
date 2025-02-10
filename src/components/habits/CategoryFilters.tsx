
import { categoryIcons } from "@/lib/habits";

export const CategoryFilters = () => {
  return (
    <div className="flex gap-2">
      {Object.entries(categoryIcons).map(([category, icon]) => (
        <div 
          key={category}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/80"
        >
          {icon}
          <span className="text-sm">{category}</span>
        </div>
      ))}
    </div>
  );
};
