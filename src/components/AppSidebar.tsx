
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
import { useState } from "react";

// Menu items grouped by category
const menuGroups = [
  {
    label: "Přehled",
    items: [
      { title: "Dashboard", icon: Home, path: "/" },
      { title: "Osobní vize", icon: Brain, path: "/vision", hasNew: false },
    ]
  },
  {
    label: "Každodenní",
    items: [
      { title: "Buzer lístek", icon: CheckSquare, path: "/habits", hasNew: false },
      { title: "To-Do-All", icon: ListTodo, path: "/todos", hasNew: false },
      { title: "Týdenní reflexe", icon: Calendar, path: "/weekly", hasNew: true },
      { title: "Flow lístek", icon: Heart, path: "/gratitude", hasNew: false },
      { title: "Memento Mori", icon: Clock, path: "/memento-mori", hasNew: false },
    ]
  },
  {
    label: "Rozvoj",
    items: [
      { title: "Nápady", icon: StickyNote, path: "/notes", hasNew: false },
      { title: "Asertivní práva", icon: Shield, path: "/assertive-rights", hasNew: false },
      { title: "Hledání silných stránek", icon: Star, path: "/finding-strengths", hasNew: false },
      { title: "Seznam emocí", icon: Smile, path: "/emotions-list", hasNew: false },
    ]
  }
];

export function AppSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Sidebar className="border-r border-white/10">
      <SidebarContent>
        <div className="py-4 px-2 mb-4">
          <h1 className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Flow OS
          </h1>
        </div>
        
        {menuGroups.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-white/50 font-medium px-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-300",
                          window.location.pathname === item.path 
                            ? "bg-primary/10 text-primary border-l-2 border-primary" 
                            : "hover:bg-white/10 border-l-2 border-transparent",
                          hoveredItem === item.title && "bg-white/5"
                        )}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          hoveredItem === item.title && "scale-110",
                          window.location.pathname === item.path && "text-primary"
                        )} />
                        <span className={cn(
                          "font-medium",
                          window.location.pathname === item.path && "text-primary"
                        )}>
                          {item.title}
                        </span>
                        {item.hasNew && (
                          <Badge className="ml-auto bg-primary/20 text-primary border-none text-xs">Nové</Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        <div className="mt-auto p-4">
          <div className="p-4 rounded-lg glass-card text-center">
            <p className="text-xs text-white/60">Flow OS v1.0</p>
            <p className="text-xs text-white/60">Vytvořeno s ❤️</p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
