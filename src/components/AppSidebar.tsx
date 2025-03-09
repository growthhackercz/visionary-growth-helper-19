
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
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
