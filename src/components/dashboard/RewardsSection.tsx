
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Coffee, Film, Gamepad, Utensils, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  const { data: userPoints } = useQuery({
    queryKey: ['user_points'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const claimRewardMutation = useMutation({
    mutationFn: async ({ rewardId, cost }: { rewardId: string, cost: number }) => {
      const { error: claimError } = await supabase
        .from('reward_claims')
        .insert([
          { reward_id: rewardId }
        ]);
      if (claimError) throw claimError;

      const { error: pointsError } = await supabase
        .from('user_points')
        .upsert([
          { 
            points: (userPoints?.points || 0) - cost,
            ...(userPoints ? {} : { user_id: (await supabase.auth.getUser()).data.user?.id })
          }
        ], {
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
    <Card className="p-6 space-y-4 backdrop-blur-lg bg-card/30 border-white/10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Odměny</h2>
        <span className="text-white/80">Dostupné body: {userPoints?.points || 0}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards?.map((reward) => (
          <div
            key={reward.id}
            className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
          >
            <div className="flex items-center gap-3">
              {iconMap[reward.icon]}
              <div>
                <h3 className="font-semibold text-white">{reward.name}</h3>
                <p className="text-sm text-white/60">{reward.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/80">{reward.cost} bodů</span>
              <Button
                variant="secondary"
                className="bg-white/10 hover:bg-white/20"
                onClick={() => handleClaimReward(reward.id, reward.cost)}
                disabled={claimRewardMutation.isPending || (userPoints?.points || 0) < reward.cost}
              >
                {claimRewardMutation.isPending ? "Získávám..." : "Získat odměnu"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
