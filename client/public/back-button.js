// Script para adicionar um botão "Voltar para o site" em páginas externas
(function() {
  // Esta parte do código será executada automaticamente quando o script for carregado

  // Verifica se já tentamos injetar o botão antes para evitar operações repetidas
  if (window.alexBackButtonInjected) return;
  window.alexBackButtonInjected = true;

  // Verifica se temos um lastPage armazenado
  const lastPage = localStorage.getItem('lastPage');
  if (!lastPage) return;

  // Verifica se já existe um botão para evitar duplicação
  if (document.getElementById('alex-back-button')) return;

  // Função para criar e adicionar o botão à página
  function addBackButton() {
    // Cria o botão
    const button = document.createElement('button');
    button.id = 'alex-back-button';
    button.innerHTML = '<span style="margin-right: 5px;">←</span> Voltar para o site';
    
    // Estiliza o botão
    Object.assign(button.style, {
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: '9999999',
      backgroundColor: '#ffffff',
      color: '#333',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease'
    });

    // Adiciona efeitos hover
    button.onmouseover = function() {
      this.style.backgroundColor = '#f8f8f8';
      this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    };
    button.onmouseout = function() {
      this.style.backgroundColor = '#ffffff';
      this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    };

    // Adiciona o evento de clique
    button.onclick = function() {
      // Navega de volta para a página do site
      window.location.href = lastPage.startsWith('/')
        ? window.location.origin + lastPage
        : lastPage;
    };

    // Adiciona o botão ao corpo da página
    document.body.appendChild(button);

    // Animação para o botão aparecer suavemente
    try {
      button.animate([
        { opacity: 0, transform: 'translateY(-10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
      });
    } catch (e) {
      // Fallback para navegadores que não suportam a API de animação
      button.style.opacity = '1';
    }
  }
  
  // Espera um pouco para garantir que o DOM está completamente carregado
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(addBackButton, 500);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(addBackButton, 500);
    });
  }
  
  // Tenta novamente em caso de páginas dinâmicas que podem carregar depois
  setTimeout(addBackButton, 2000);
})();