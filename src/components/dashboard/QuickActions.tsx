
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickActionsProps {
  categories: Array<{
    title: string;
    icon: any;
    color: string;
  }>;
  showQuickAdd: boolean;
  setShowQuickAdd: (show: boolean) => void;
}

export const QuickActions = ({ categories, showQuickAdd, setShowQuickAdd }: QuickActionsProps) => {
  const { toast } = useToast();

  const handleQuickAdd = (type: string) => {
    toast({
      title: "Rychlé přidání",
      description: `Přidáno do sekce ${type}`,
      duration: 3000,
    });
    setShowQuickAdd(false);
  };

  return (
    <>
      <button
        onClick={() => setShowQuickAdd(!showQuickAdd)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors z-50"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showQuickAdd && (
        <div className="fixed bottom-24 right-6 bg-card rounded-lg shadow-lg p-4 space-y-2 z-50 animate-fade-in w-64 max-w-[calc(100vw-3rem)]">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleQuickAdd(category.title)}
              className={`flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent transition-colors ${category.color}`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm">{category.title}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
