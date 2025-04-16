import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';

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

// Componente que salva a última página interna antes de navegar para um link externo
export function NavbarTracker() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Atualiza a última página interna visitada quando a localização muda
    localStorage.setItem('lastPage', location);
  }, [location]);
  
  return null; // Este componente não renderiza nada visível
}

// Componente de link que adiciona a funcionalidade de salvar a última página visitada
export default function NavbarLink({ 
  href, 
  children, 
  className = "",
  onClick,
  ...props 
}: { 
  href: string, 
  children: React.ReactNode, 
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
  [key: string]: any 
}) {
  const [location] = useLocation();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Executa o onClick original se existir
    if (onClick) {
      onClick(e);
    }
    
    // Se for um link externo, trata com o manipulador especializado
    if (!href.startsWith('/') && !href.startsWith(window.location.origin)) {
      e.preventDefault();
      
      // Salva a última página interna visitada
      localStorage.setItem('lastPage', location);
      
      // Prepara o script do botão de voltar
      injectBackButton(href);
      
      // Abre o link na mesma janela
      window.location.href = href;
    }
  };
  
  // Se for um link interno, usa o componente Link do wouter
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  
  // Para links externos, usa uma âncora normal com o manipulador de clique
  return (
    <a 
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}