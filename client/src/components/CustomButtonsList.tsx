import { useState, useEffect } from "react";
import { PageType } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import ServiceCard from "@/components/ServiceCard";
import { Home, Settings, Play, Globe } from "lucide-react";
import { ReactNode } from "react";

// Tipo para representar um botão personalizado
type CustomButton = {
  id: number;
  title: string;
  description: string;
  pageType: PageType;
  icon: string;
  iconBgColor: string;
  url: string;
  createdAt: string;
};

interface CustomButtonsListProps {
  pageType: PageType;
}

export default function CustomButtonsList({ pageType }: CustomButtonsListProps) {
  const [buttons, setButtons] = useState<CustomButton[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchButtons = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest<CustomButton[]>({
          url: `/api/buttons/page/${pageType}`,
          method: "GET",
        });
        setButtons(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao carregar botões:", error);
        setError("Não foi possível carregar os botões personalizados");
      } finally {
        setIsLoading(false);
      }
    };

    fetchButtons();
  }, [pageType]);

  // Função para retornar o ícone correto baseado no nome
  const getIconComponent = (iconName: string, color: string): ReactNode => {
    const iconProps = { className: "h-6 w-6", style: { color } };
    
    switch (iconName) {
      case "Home":
        return <Home {...iconProps} />;
      case "Settings":
        return <Settings {...iconProps} />;
      case "Play":
        return <Play {...iconProps} />;
      case "Globe":
        return <Globe {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };

  if (isLoading) {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-100 animate-pulse h-32 rounded-lg"
          />
        ))}
      </>
    );
  }

  if (error) {
    return <p className="text-sm text-gray-500">{error}</p>;
  }

  if (buttons.length === 0) {
    return (
      <div className="col-span-full text-center py-6 text-gray-500">
        Nenhum botão personalizado adicionado para esta seção.
      </div>
    );
  }

  return (
    <>
      {buttons.map((button) => (
        <ServiceCard
          key={button.id}
          title={button.title}
          description={button.description}
          icon={getIconComponent(button.icon, button.iconBgColor)}
          href={button.url}
          iconBgClass={`bg-opacity-10`}
          style={{ backgroundColor: `${button.iconBgColor}20` }}
        />
      ))}
    </>
  );
}