
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const HabitReminders = () => {
  const { toast } = useToast();
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  useEffect(() => {
    const checkReminders = async () => {
      try {
        const { data: reminders, error } = await supabase
          .from('habit_reminders')
          .select('*')
          .is('sent_at', null)
          .order('scheduled_for', { ascending: true });

        if (error) throw error;

        if (reminders && reminders.length > 0) {
          // Zobrazit notifikace
          reminders.forEach(reminder => {
            toast({
              title: reminder.title,
              description: reminder.body,
              duration: 5000,
            });
          });

          // Označit notifikace jako odeslané
          const reminderIds = reminders.map(r => r.id);
          await supabase
            .from('habit_reminders')
            .update({ sent_at: new Date().toISOString() })
            .in('id', reminderIds);
        }
      } catch (error) {
        console.error('Error checking reminders:', error);
      }
    };

    // Kontrolovat notifikace každou minutu
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getTime() - lastCheck.getTime() >= 60000) {
        checkReminders();
        setLastCheck(now);
      }
    }, 60000);

    // Počáteční kontrola
    checkReminders();

    return () => clearInterval(interval);
  }, [lastCheck, toast]);

  return null; // Tato komponenta nemá žádné UI
};
