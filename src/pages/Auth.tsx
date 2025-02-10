
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
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
        </div>

        <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Vítejte zpět
              </h1>
              <p className="text-white/60">
                Přihlaste se nebo si vytvořte nový účet
              </p>
            </div>

            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/5">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Přihlášení
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Registrace
                </TabsTrigger>
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
                    className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/50 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Heslo</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/50 transition-colors"
                  />
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 transition-colors" 
                  onClick={handleSignIn}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Přihlašování...
                    </span>
                  ) : (
                    "Přihlásit se"
                  )}
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
                    className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/50 transition-colors"
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
                    className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/50 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Heslo</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/50 transition-colors"
                  />
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 transition-colors" 
                  onClick={handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Registrace...
                    </span>
                  ) : (
                    "Zaregistrovat se"
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
