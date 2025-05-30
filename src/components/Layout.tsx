
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { PomodoroTimer } from "./PomodoroTimer";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import { LogOut, Settings } from "lucide-react";
import { HabitReminders } from "./habits/HabitReminders";
import { GlobalSearch } from "./ui/global-search";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-6 lg:px-8 relative">
            <div className="flex justify-between items-center mb-4 sticky top-0 z-10 backdrop-blur-md bg-secondary/80 py-2 px-4 -mx-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/60">
                  {new Date().toLocaleDateString('cs-CZ', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <GlobalSearch />
              </div>
              
              <div className="flex items-center gap-2">
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Nastavení
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card border-white/10">
                      <DropdownMenuItem 
                        className="hover:bg-white/10 cursor-pointer"
                        onClick={signOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Odhlásit se
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
            
            <AnimatePresence>
              {showScrollTopButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="fixed bottom-6 right-6 p-3 rounded-full bg-primary/90 text-white shadow-lg z-50 hover:bg-primary transition-colors"
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up">
                    <polyline points="17 11 12 6 7 11"></polyline>
                    <polyline points="17 18 12 13 7 18"></polyline>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </main>
        <PomodoroTimer />
        <HabitReminders />
      </div>
    </SidebarProvider>
  );
}
