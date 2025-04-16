import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

// Componente que gerencia cookies para rastrear links externos
export function ExternalLinkManager() {
  useEffect(() => {
    // Verifica se o usuário veio do nosso site
    const referrer = document.referrer;
    const isInternal = referrer.includes(window.location.hostname);
    
    if (isInternal) {
      // Armazena a última URL interna
      const lastInternalUrl = localStorage.getItem('lastInternalUrl') || '/';
      const navbarVisibility = localStorage.getItem('showNavbar') || 'false';
      
      // Cria e adiciona a barra de navegação fixa
      const navbarContainer = document.createElement('div');
      navbarContainer.id = 'alex-fixed-navbar';
      navbarContainer.style.position = 'fixed';
      navbarContainer.style.top = navbarVisibility === 'true' ? '0' : '-50px';
      navbarContainer.style.left = '0';
      navbarContainer.style.width = '100%';
      navbarContainer.style.backgroundColor = '#ffffff';
      navbarContainer.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      navbarContainer.style.zIndex = '9999';
      navbarContainer.style.padding = '10px';
      navbarContainer.style.display = 'flex';
      navbarContainer.style.alignItems = 'center';
      navbarContainer.style.transition = 'top 0.3s';
      
      const homeButton = document.createElement('a');
      homeButton.href = window.location.origin;
      homeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
      homeButton.style.textDecoration = 'none';
      homeButton.style.color = '#000';
      homeButton.style.marginRight = '15px';
      
      const backButton = document.createElement('a');
      backButton.href = lastInternalUrl;
      backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>`;
      backButton.style.textDecoration = 'none';
      backButton.style.color = '#000';
      backButton.style.marginRight = '15px';
      
      const siteTitle = document.createElement('span');
      siteTitle.textContent = 'Site de Alex';
      siteTitle.style.fontWeight = 'bold';
      
      const toggleButton = document.createElement('button');
      toggleButton.innerHTML = navbarVisibility === 'true' ? 'Ocultar' : 'Mostrar';
      toggleButton.style.marginLeft = 'auto';
      toggleButton.style.padding = '5px 10px';
      toggleButton.style.backgroundColor = '#f1f1f1';
      toggleButton.style.border = '1px solid #ddd';
      toggleButton.style.borderRadius = '4px';
      
      toggleButton.addEventListener('click', () => {
        const isVisible = navbarContainer.style.top === '0px';
        navbarContainer.style.top = isVisible ? '-50px' : '0';
        toggleButton.innerHTML = isVisible ? 'Mostrar' : 'Ocultar';
        localStorage.setItem('showNavbar', isVisible ? 'false' : 'true');
      });
      
      // Mostra/oculta a barra ao mover o mouse para o topo da página
      document.addEventListener('mousemove', (e) => {
        if (e.clientY < 10 && navbarContainer.style.top !== '0px') {
          navbarContainer.style.top = '0';
          toggleButton.innerHTML = 'Ocultar';
        }
      });
      
      navbarContainer.appendChild(homeButton);
      navbarContainer.appendChild(backButton);
      navbarContainer.appendChild(siteTitle);
      navbarContainer.appendChild(toggleButton);
      
      document.body.appendChild(navbarContainer);
      
      return () => {
        // Limpa o efeito ao desmontar o componente
        document.body.removeChild(navbarContainer);
      };
    }
  }, []);
  
  return null; // Este componente não renderiza conteúdo visível
}

// Hook personalizado para gerenciar links externos
export function useExternalLinkHandler() {
  const [location, setLocation] = useLocation();
  
  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Verifica se é um link interno ou externo
    if (url.startsWith('/') || url.startsWith(window.location.origin)) {
      // Link interno - navegação normal
      e.preventDefault();
      setLocation(url);
    } else {
      // Link externo - salva a URL atual como a última URL interna
      e.preventDefault();
      localStorage.setItem('lastInternalUrl', location);
      localStorage.setItem('showNavbar', 'true');
      
      // Redireciona para a URL externa
      window.location.href = url;
    }
  };
  
  return handleExternalLink;
}

// Componente que adiciona a barra de navegação fixa aos links externos
export default function ExternalLinkWithNavbar({ 
  href, 
  children, 
  className = "",
  ...props 
}: { 
  href: string, 
  children: React.ReactNode, 
  className?: string,
  [key: string]: any 
}) {
  const handleExternalLink = useExternalLinkHandler();
  
  // Para links internos, usa o componente Link do wouter
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props} className={className}>
        {children}
      </Link>
    );
  }
  
  // Para links externos, usa o manipulador personalizado
  return (
    <a 
      href={href}
      onClick={(e) => handleExternalLink(e, href)}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}