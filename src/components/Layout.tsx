
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { PomodoroTimer } from "./PomodoroTimer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-6 lg:px-8">
            {children}
          </div>
        </main>
        <PomodoroTimer />
      </div>
    </SidebarProvider>
  );
}
