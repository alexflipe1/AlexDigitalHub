import { useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import CustomButtonsList from "@/components/CustomButtonsList";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Alex() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Verificar autenticação
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAlexAuthenticated") === "true";
    if (!isAuthenticated) {
      // Se não estiver autenticado, redirecionar para a página de login
      toast({
        title: "Acesso restrito",
        description: "Você precisa fazer login para acessar esta página",
        variant: "destructive",
      });
      setLocation("/alex-login");
      return;
    }
  }, [setLocation, toast]);

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("isAlexAuthenticated");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado da área restrita",
    });
    setLocation("/alex-login");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-extrabold sm:text-4xl gradient-heading">
            Alex
          </h2>
          <p className="mt-2 text-xl text-gray-600">
            Serviços e ferramentas pessoais
          </p>
        </div>
        <Button 
          variant="destructive" 
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
      
      {/* Todos os botões são personalizados e gerenciados pelo admin */}
      <div className="space-y-6">
        <h3 className="custom-buttons-title">Meus Serviços</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CustomButtonsList pageType="alex" />
        </div>
      </div>
    </div>
  );
}
