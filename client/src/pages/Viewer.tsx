import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Viewer() {
  const [location, setLocation] = useLocation();
  const [url, setUrl] = useState<string>("");
  const [previousPage, setPreviousPage] = useState<string>("/");

  useEffect(() => {
    // Recupera a URL do parâmetro de consulta
    const params = new URLSearchParams(window.location.search);
    const externalUrl = params.get("url");
    const from = params.get("from") || "/";
    
    if (externalUrl) {
      setUrl(externalUrl);
      setPreviousPage(from);
    } else {
      // Se não tem URL, volta para a página principal
      setLocation("/");
    }
  }, [setLocation]);

  const handleBack = () => {
    setLocation(previousPage);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 bg-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="ml-4 text-lg font-medium truncate">{url}</h1>
      </div>
      <div className="flex-grow">
        {url ? (
          <iframe
            src={url}
            title="Conteúdo externo"
            className="w-full h-full border-0"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            Carregando...
          </div>
        )}
      </div>
    </div>
  );
}