
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardStatsProps {
  weeklyData: Array<{
    den: string;
    splněno: number;
    body: number;
  }>;
}

export const DashboardStats = ({ weeklyData }: DashboardStatsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 mt-8`}>
      <Card className="p-6 backdrop-blur-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">Týdenní aktivita</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="den" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#333',
                  border: '1px solid #666',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="splněno" fill="#ea384c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">Body za týden</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="den" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#333',
                  border: '1px solid #666',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="body" stroke="#ea384c" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
