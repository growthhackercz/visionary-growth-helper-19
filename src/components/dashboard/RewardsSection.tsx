
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Coffee, Film, Gamepad, Utensils, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";

const iconMap: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-6 h-6 text-brown-500" />,
  Film: <Film className="w-6 h-6 text-purple-500" />,
  Gamepad: <Gamepad className="w-6 h-6 text-green-500" />,
  Utensils: <Utensils className="w-6 h-6 text-red-500" />,
  Sun: <Sun className="w-6 h-6 text-yellow-500" />,
};

export const RewardsSection = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: rewards } = useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*');
      if (error) throw error;
      return data || [];
    },
  });

  // Initialize user points if they don't exist
  const initializeUserPoints = async () => {
    if (!user?.id) return null;
    
    const { data, error } = await supabase
      .from('user_points')
      .upsert({
        user_id: user.id,
        points: 0
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  };

  const { data: userPoints } = useQuery({
    queryKey: ['user_points', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      // If no points record exists, create one
      if (!data) {
        return initializeUserPoints();
      }

      return data;
    },
    enabled: !!user?.id,
  });

  const claimRewardMutation = useMutation({
    mutationFn: async ({ rewardId, cost }: { rewardId: string, cost: number }) => {
      if (!user?.id) throw new Error("User not authenticated");

      // Insert reward claim
      const { error: claimError } = await supabase
        .from('reward_claims')
        .insert({
          reward_id: rewardId,
          user_id: user.id
        });
      if (claimError) throw claimError;

      // Update user points
      const { error: pointsError } = await supabase
        .from('user_points')
        .upsert({
          user_id: user.id,
          points: (userPoints?.points || 0) - cost
        }, {
          onConflict: 'user_id'
        });
      if (pointsError) throw pointsError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_points'] });
      queryClient.invalidateQueries({ queryKey: ['reward_claims'] });
    },
  });

  const handleClaimReward = async (rewardId: string, cost: number) => {
    const currentPoints = userPoints?.points || 0;
    
    if (currentPoints < cost) {
      toast({
        title: "Nedostatek bodů",
        description: "Nemáte dostatek bodů pro získání této odměny.",
        duration: 3000,
      });
      return;
    }

    try {
      await claimRewardMutation.mutateAsync({ rewardId, cost });
      toast({
        title: "Odměna získána!",
        description: "Vaše odměna byla úspěšně získána.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Při získávání odměny došlo k chybě.",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="p-8 space-y-6 backdrop-blur-xl bg-gradient-to-br from-black/30 via-black/20 to-black/10 border-white/10 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Odměny
          </h2>
          <p className="text-white/60">Získejte speciální odměny za své úspěchy</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner">
          <span className="text-lg font-medium bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {userPoints?.points || 0} bodů
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards?.map((reward) => (
          <div
            key={reward.id}
            className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl space-y-4 transition-colors duration-300 group-hover:bg-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[reward.icon]}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{reward.name}</h3>
                  <p className="text-sm text-white/60">{reward.description}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-white/80">{reward.cost} bodů</span>
                </div>
                <Button
                  variant="secondary"
                  className="bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/80 text-white border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
                  onClick={() => handleClaimReward(reward.id, reward.cost)}
                  disabled={claimRewardMutation.isPending || (userPoints?.points || 0) < reward.cost}
                >
                  {claimRewardMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Získávám...
                    </span>
                  ) : "Získat odměnu"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
