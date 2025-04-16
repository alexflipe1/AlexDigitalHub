import { useEffect } from 'react';

export default function ScriptInjector() {
  useEffect(() => {
    // Cria um elemento de script para o navbar
    const navbarScript = document.createElement('script');
    navbarScript.src = '/navbar-script.js';
    navbarScript.defer = true;
    navbarScript.id = 'alex-navbar-script';
    
    // Adiciona o script no final do <head>
    document.head.appendChild(navbarScript);
    
    return () => {
      // Remove o script ao desmontar o componente
      const existingScript = document.getElementById('alex-navbar-script');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  
  return null; // Este componente não renderiza nada visível
}