
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Target, Activity, TrendingUp } from "lucide-react";

interface DashboardTabsProps {
  overviewContent: React.ReactNode;
  activitiesContent: React.ReactNode;
  goalsContent: React.ReactNode;
  statsContent: React.ReactNode;
}

export const DashboardTabs = ({
  overviewContent,
  activitiesContent,
  goalsContent,
  statsContent,
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Přehled</span>
        </TabsTrigger>
        <TabsTrigger value="activities" className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <span className="hidden sm:inline">Aktivity</span>
        </TabsTrigger>
        <TabsTrigger value="goals" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span className="hidden sm:inline">Cíle</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Statistiky</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {overviewContent}
      </TabsContent>

      <TabsContent value="activities" className="space-y-6">
        {activitiesContent}
      </TabsContent>

      <TabsContent value="goals" className="space-y-6">
        {goalsContent}
      </TabsContent>

      <TabsContent value="stats" className="space-y-6">
        {statsContent}
      </TabsContent>
    </Tabs>
  );
};
