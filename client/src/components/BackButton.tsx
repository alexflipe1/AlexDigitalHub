import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from 'wouter';

export default function BackButton() {
  const [showBackButton, setShowBackButton] = useState(false);
  const [lastPage, setLastPage] = useState('/');
  const [_, navigate] = useLocation();

  useEffect(() => {
    // Verifica se há um lastPage salvo no localStorage
    const savedLastPage = localStorage.getItem('lastPage');
    if (savedLastPage) {
      setLastPage(savedLastPage);
      setShowBackButton(true);
      
      // Limpa o lastPage do localStorage para que o botão não apareça
      // em navegações futuras a menos que venha de um site externo
      localStorage.removeItem('lastPage');
    }
  }, []);

  if (!showBackButton) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 animate-fade-in">
      <Button 
        variant="outline" 
        size="sm"
        className="flex items-center gap-1 bg-white shadow-md border-gray-200 hover:bg-gray-100"
        onClick={() => navigate(lastPage)}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o site
      </Button>
    </div>
  );
}