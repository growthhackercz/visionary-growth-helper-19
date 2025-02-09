
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardCalendar = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="p-6 backdrop-blur-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Kalendář</h3>
      <div className="w-full overflow-hidden rounded-lg">
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=jiri.growthhacker%40gmail.com&ctz=Europe%2FPrague" 
          className={`w-full ${isMobile ? 'h-[400px]' : 'h-[600px]'} border-0`}
          frameBorder="0" 
          scrolling="no"
          title="Google Calendar"
        />
      </div>
    </Card>
  );
};
