
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  userName: string;
  setUserName: (name: string) => void;
  dailyQuote: string;
  showDailyMotivation: () => void;
}

export const DashboardHeader = ({ 
  userName, 
  setUserName, 
  dailyQuote,
  showDailyMotivation 
}: DashboardHeaderProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  return (
    <section className="text-center space-y-4 px-4">
      <div className="relative inline-block">
        <div className="flex items-center justify-center gap-4">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent`}>
            Vítej zpět, {userName}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => {
                  const newName = prompt("Zadejte své jméno:");
                  if (newName) {
                    setUserName(newName);
                    localStorage.setItem("userName", newName);
                    toast({
                      title: "Jméno bylo změněno",
                      description: `Vítej, ${newName}!`,
                    });
                  }
                }}
              >
                Změnit jméno
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div 
          className="absolute -right-16 -top-12 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group" 
          onClick={showDailyMotivation}
        >
          <img 
            src="/mascot.svg" 
            alt="Flowík" 
            className="w-16 h-16 group-hover:animate-bounce" 
          />
        </div>
      </div>
      <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white/80 max-w-2xl mx-auto`}>{dailyQuote}</p>
    </section>
  );
};
