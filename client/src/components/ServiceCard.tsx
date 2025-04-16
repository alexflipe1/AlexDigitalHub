import { ReactNode } from "react";
import { Link, useLocation } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  iconBgClass?: string;
  style?: React.CSSProperties;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  iconBgClass = "bg-primary/10",
  style
}: ServiceCardProps) {
  const [location] = useLocation();

  // Função para injetar o script do botão de voltar em um site externo
  const injectBackButton = (targetUrl: string) => {
    // Cria um bookmark com JavaScript que fará o download e execução do nosso script
    const backButtonScriptUrl = `${window.location.origin}/back-button.js`;
    const scriptTag = `
      const script = document.createElement('script');
      script.src = "${backButtonScriptUrl}";
      document.body.appendChild(script);
    `;
    
    // Codifica o script como URI para usar em um bookmarklet
    const bookmarklet = `javascript:(function(){${encodeURIComponent(scriptTag)}})();`;
    
    // Salva o bookmarklet no localStorage
    localStorage.setItem("backButtonBookmarklet", bookmarklet);
    
    // Também salva o script em localStorage para caso o site de destino bloqueie scripts externos
    fetch(backButtonScriptUrl)
      .then(response => response.text())
      .then(script => {
        localStorage.setItem("backButtonScript", script);
      })
      .catch(error => console.error("Erro ao buscar o script:", error));
  };

  // Função para lidar com o clique em links
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Se for um link interno (começa com /), deixa o comportamento padrão
    if (href.startsWith('/')) {
      return;
    }
    
    // Para links externos, impede o comportamento padrão
    e.preventDefault();
    
    // Salva a localização atual para que o usuário possa voltar
    localStorage.setItem("lastPage", location);
    
    // Prepara o script do botão de voltar
    injectBackButton(href);
    
    // Abre o link na mesma aba
    window.location.href = href;
  };

  // Se for um link interno, usa o componente Link do wouter
  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
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
      </Link>
    );
  }

  // Para links externos, usa uma âncora normal com o manipulador de clique
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
