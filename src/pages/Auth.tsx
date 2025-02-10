
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (!email || !password || !username) {
        throw new Error("Prosím vyplňte všechna pole");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "Registrace úspěšná",
          description: "Nyní se můžete přihlásit",
        });
      }
    } catch (error: any) {
      toast({
        title: "Chyba při registraci",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error("Prosím vyplňte všechna pole");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate("/");
        toast({
          title: "Přihlášení úspěšné",
          description: "Vítejte zpět!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Chyba při přihlášení",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto mt-20">
        <Card className="p-6 backdrop-blur-lg bg-card/30 border-white/10">
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Přihlášení</TabsTrigger>
              <TabsTrigger value="register">Registrace</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Heslo</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-white/10"
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? "Přihlašování..." : "Přihlásit se"}
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="vas@email.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/50 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Uživatelské jméno</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Vaše přezdívka"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary/50 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Heslo</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-white/10"
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? "Registrace..." : "Zaregistrovat se"}
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
}
