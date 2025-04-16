import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import CustomButtonsList from "@/components/CustomButtonsList";
import { LogOut, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Alex() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Estado para verificar se está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Verificar autenticação toda vez que a página for carregada
  useEffect(() => {
    const authStatus = localStorage.getItem("isAlexAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
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

  // Se ainda não verificou a autenticação, não renderiza nada ou mostra um loading
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Se não está autenticado, também não renderiza o conteúdo (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

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
      
      {/* Seção de Administração */}
      <div className="mb-8">
        <h3 className="custom-buttons-title mb-4">Administração</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin" className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                  <Sliders className="h-6 w-6 text-orange-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Administração</h3>
                  <p className="mt-1 text-sm text-gray-500">Gerenciar botões personalizados</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
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
