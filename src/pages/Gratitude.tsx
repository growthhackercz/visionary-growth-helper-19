
import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { GratitudeStreak } from "@/components/gratitude/GratitudeStreak";
import { GratitudeForm } from "@/components/gratitude/GratitudeForm";
import { GratitudeHistory } from "@/components/gratitude/GratitudeHistory";

interface GratitudeEntry {
  id: string;
  entry_date: string;
  entry_1: string | null;
  entry_2: string | null;
  entry_3: string | null;
}

const Gratitude = () => {
  const [streak, setStreak] = useState(0);

  // Fetch streak
  const fetchStreak = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    
    const { data, error } = await supabase.rpc('get_gratitude_streak', {
      user_uuid: user.id
    });
    
    if (error) throw error;
    return data;
  };

  // Fetch today's entries if they exist
  const fetchTodayEntries = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('gratitude_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('entry_date', new Date().toISOString().split('T')[0])
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  // Fetch history
  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('gratitude_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('entry_date', { ascending: false })
      .limit(7);

    if (error) throw error;
    return data;
  };

  const { data: streakData } = useQuery({
    queryKey: ['gratitudeStreak'],
    queryFn: fetchStreak
  });

  const { data: todayEntries } = useQuery({
    queryKey: ['todayGratitude'],
    queryFn: fetchTodayEntries
  });

  const { data: historyData } = useQuery({
    queryKey: ['gratitudeHistory'],
    queryFn: fetchHistory
  });

  useEffect(() => {
    if (streakData !== undefined) {
      setStreak(streakData);
    }
  }, [streakData]);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Flow lístek</h1>
          <p className="text-lg text-white/80">Váš deník vděčnosti</p>
        </section>

        <GratitudeStreak streak={streak} />

        <GratitudeForm 
          initialEntries={todayEntries ? [
            todayEntries.entry_1 || "",
            todayEntries.entry_2 || "",
            todayEntries.entry_3 || ""
          ] : undefined} 
        />

        {historyData && <GratitudeHistory entries={historyData} />}
      </div>
    </Layout>
  );
};

export default Gratitude;
