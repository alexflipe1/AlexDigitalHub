import { useEffect } from 'react';

// Este componente é responsável por injetar o script do botão "Voltar para o site"
// em sites externos quando a página é carregada
export default function ScriptInjector() {
  useEffect(() => {
    // Verifica se estamos em um site externo
    const isExternalSite = !window.location.href.includes(window.location.host);
    
    if (isExternalSite) {
      // Se estivermos em um site externo, tenta injetar o script do botão de voltar
      // O script está armazenado no localStorage e foi preparado quando o link foi clicado
      const script = localStorage.getItem('backButtonScript');
      
      if (script) {
        try {
          // Cria um elemento script
          const scriptElement = document.createElement('script');
          scriptElement.textContent = script;
          document.body.appendChild(scriptElement);
        } catch (error) {
          console.error('Erro ao injetar o script:', error);
        }
      }
    }
  }, []);

  // Este componente não renderiza nada visualmente
  return null;
}