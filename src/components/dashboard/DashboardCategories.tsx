
import { Brain, CheckSquare, ListTodo, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CategoryProps {
  progressValues: {
    habits: number;
    todos: number;
    meditation: number;
    gratitude: number;
  };
  isMobile: boolean;
}

export const DashboardCategories = ({ progressValues, isMobile }: CategoryProps) => {
  const categories = [
    {
      title: "Osobní vize",
      description: "Definujte a vizualizujte svou cestu",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/vision",
      progress: null
    },
    {
      title: "Buzer lístek",
      description: "3 ze 5 splněno dnes",
      icon: CheckSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/habits",
      progress: progressValues.habits
    },
    {
      title: "To-Do-All",
      description: "2 prioritní úkoly dnes",
      icon: ListTodo,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      link: "/todos",
      progress: progressValues.todos
    },
    {
      title: "Týdenní reflexe",
      description: "Příští schůzka: Neděle",
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      link: "/weekly",
      progress: null
    },
    {
      title: "Flow lístek",
      description: "Zapište si dnešní vděčnost",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      link: "/gratitude",
      progress: progressValues.gratitude
    }
  ];

  return (
    <section className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} px-4`}>
      {categories.map((category, index) => (
        <Link to={category.link} key={index}>
          <Card className={`relative p-6 space-y-4 backdrop-blur-lg bg-card border-white/10 hover:${category.bgColor} transition-colors group`}>
            <div className="flex items-center gap-3">
              <category.icon className={`w-6 h-6 ${category.color} group-hover:scale-110 transition-transform`} />
              <h2 className="text-xl font-semibold text-white">{category.title}</h2>
            </div>
            <p className="text-white/80">{category.description}</p>
            {category.progress !== null && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Pokrok</span>
                  <span>{category.progress}%</span>
                </div>
                <Progress value={category.progress} className="h-2" />
              </div>
            )}
            <Button 
              variant="secondary" 
              className={`w-full group-hover:${category.color} group-hover:text-white transition-colors`}
            >
              Otevřít {category.title.toLowerCase()}
            </Button>
          </Card>
        </Link>
      ))}
    </section>
  );
};
