import { ReactNode } from "react";
import { useLocation } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  iconBgClass?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  iconBgClass = "bg-primary/10",
  style,
  onClick
}: ServiceCardProps) {
  const [location, setLocation] = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Se temos um handler de clique personalizado, use-o
    if (onClick) {
      onClick(e);
      return;
    }
    
    // Caso contrário, use o comportamento padrão
    // Verifica se o link é interno ou externo
    if (href.startsWith('/') || href.startsWith(window.location.origin)) {
      // Link interno - navega diretamente
      setLocation(href);
    } else {
      // Link externo - redireciona para o visualizador
      const currentPath = location;
      setLocation(`/viewer?url=${encodeURIComponent(href)}&from=${encodeURIComponent(currentPath)}`);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconBgClass} rounded-md p-3`} style={style}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
