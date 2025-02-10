
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { PomodoroTimer } from "./PomodoroTimer";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-6 lg:px-8">
            <div className="flex justify-end mb-4">
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-muted-foreground hover:text-primary"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Odhlásit se
                </Button>
              )}
            </div>
            {children}
          </div>
        </main>
        <PomodoroTimer />
      </div>
    </SidebarProvider>
  );
}
