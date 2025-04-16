import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Componente que salva a última página interna antes de navegar para um link externo
export function NavbarTracker() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Atualiza a última página interna visitada quando a localização muda
    localStorage.setItem('alexLastPage', location);
  }, [location]);
  
  return null; // Este componente não renderiza nada visível
}

// Hook personalizado para gerenciar links externos com a barra de navegação
export function useNavbarLink() {
  const [location] = useLocation();
  
  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Verifica se é um link interno ou externo
    if (href.startsWith('/') || href.startsWith(window.location.origin)) {
      // Para links internos, comportamento normal do React Router
      return true;
    } else {
      // Para links externos, salva o estado e adiciona um marcador
      e.preventDefault();
      
      // Salva a última página interna visitada
      localStorage.setItem('alexLastPage', location);
      localStorage.setItem('fromAlexSite', 'true');
      
      // Abre o link na mesma janela
      window.location.href = href;
      return false;
    }
  };
  
  return handleExternalLink;
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
  const handleNavbarLink = useNavbarLink();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Executa o onClick original se existir
    if (onClick) {
      onClick(e);
    }
    
    // Se for um link externo, trata com o manipulador especializado
    if (!href.startsWith('/') && !href.startsWith(window.location.origin)) {
      return handleNavbarLink(e, href);
    }
  };
  
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