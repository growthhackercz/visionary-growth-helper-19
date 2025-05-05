
import { Home, Brain, CheckSquare, ListTodo, Calendar, Heart, Clock, StickyNote, Shield, Star, Smile } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Osobní vize", icon: Brain, path: "/vision" },
  { title: "Buzer lístek", icon: CheckSquare, path: "/habits" },
  { title: "To-Do-All", icon: ListTodo, path: "/todos" },
  { title: "Týdenní reflexe", icon: Calendar, path: "/weekly" },
  { title: "Flow lístek", icon: Heart, path: "/gratitude" },
  { title: "Memento Mori", icon: Clock, path: "/memento-mori" },
  { title: "Nápady", icon: StickyNote, path: "/notes" },
  { title: "Asertivní práva", icon: Shield, path: "/assertive-rights" },
  { title: "Hledání silných stránek", icon: Star, path: "/finding-strengths" },
  { title: "Seznam emocí", icon: Smile, path: "/emotions-list" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/10">
      <SidebarContent>
        <div className="py-4 px-2 mb-4">
          <h1 className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Flow OS
          </h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-white/50 font-medium px-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-white/10",
                        window.location.pathname === item.path && "bg-white/10 text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                      {item.title === "Týdenní reflexe" && (
                        <Badge className="ml-auto bg-primary/20 text-primary border-none text-xs">New</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
