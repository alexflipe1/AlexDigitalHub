import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();

  // Senha fixa para o admin (em um ambiente real, isso seria validado no servidor)
  const adminPassword = "admin123";

  // Verifica se já está autenticado ao carregar a página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    if (isAuthenticated) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula uma verificação de senha
    setTimeout(() => {
      if (password === adminPassword) {
        // Se a senha estiver correta, salva no localStorage e redireciona
        localStorage.setItem("isAdminAuthenticated", "true");
        setLocation("/admin");
        toast({
          title: "Login realizado com sucesso",
          description: "Você foi redirecionado para a página de administração",
        });
      } else {
        // Se a senha estiver incorreta, mostra um erro
        toast({
          title: "Erro de autenticação",
          description: "Senha incorreta. Tente novamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold mt-4">
            Acesso Administrativo
          </CardTitle>
          <CardDescription className="text-center">
            Digite a senha para acessar a área de administração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite a senha de administrador"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          <p className="w-full">
            Esta área é restrita a administradores.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}