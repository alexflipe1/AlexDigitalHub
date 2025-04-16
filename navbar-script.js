(() => {
  // Verifica se estamos em um iframe
  if (window.top !== window.self) return;

  // Verifica se já viemos do site do Alex (usando referer)
  const fromAlex = document.referrer.includes(window.location.hostname) || 
                   localStorage.getItem('fromAlexSite') === 'true';
                   
  if (!fromAlex) return;

  // Define a última página visitada
  const lastPage = localStorage.getItem('alexLastPage') || '/';
  
  // Cria a barra de navegação flutuante
  const createNavbar = () => {
    // Remove qualquer barra existente
    const existingNavbar = document.getElementById('alex-navbar');
    if (existingNavbar) existingNavbar.remove();
    
    // Cria o contêiner da barra
    const navbar = document.createElement('div');
    navbar.id = 'alex-navbar';
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.right = '0';
    navbar.style.backgroundColor = '#ffffff';
    navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    navbar.style.padding = '10px 20px';
    navbar.style.display = 'flex';
    navbar.style.alignItems = 'center';
    navbar.style.zIndex = '9999999';
    navbar.style.transition = 'transform 0.3s ease';
    
    // Botão Voltar
    const backButton = document.createElement('a');
    backButton.textContent = '← Voltar';
    backButton.href = '//' + window.location.hostname + lastPage;
    backButton.style.marginRight = '15px';
    backButton.style.color = '#333';
    backButton.style.textDecoration = 'none';
    backButton.style.fontWeight = 'bold';
    
    // Botão Início
    const homeButton = document.createElement('a');
    homeButton.textContent = 'Página Inicial';
    homeButton.href = '//' + window.location.hostname;
    homeButton.style.color = '#333';
    homeButton.style.textDecoration = 'none';
    homeButton.style.fontWeight = 'bold';
    
    // Botão para minimizar/expandir
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '−';
    toggleButton.style.marginLeft = 'auto';
    toggleButton.style.background = 'none';
    toggleButton.style.border = 'none';
    toggleButton.style.fontSize = '18px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.width = '30px';
    toggleButton.style.height = '30px';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    
    // Evento de clique para minimizar/expandir
    let isMinimized = false;
    toggleButton.addEventListener('click', () => {
      if (isMinimized) {
        navbar.style.transform = 'translateY(0)';
        toggleButton.textContent = '−';
      } else {
        navbar.style.transform = 'translateY(-80%)';
        toggleButton.textContent = '+';
      }
      isMinimized = !isMinimized;
    });
    
    // Adiciona evento de mouseover para exibir quando minimizado
    navbar.addEventListener('mouseenter', () => {
      if (isMinimized) {
        navbar.style.transform = 'translateY(0)';
      }
    });
    
    navbar.addEventListener('mouseleave', () => {
      if (isMinimized) {
        navbar.style.transform = 'translateY(-80%)';
      }
    });
    
    // Adiciona os elementos à barra
    navbar.appendChild(backButton);
    navbar.appendChild(homeButton);
    navbar.appendChild(toggleButton);
    
    // Adiciona a barra ao corpo da página
    document.body.appendChild(navbar);
    
    // Ajusta o padding do corpo para acomodar a barra
    const bodyPadding = parseInt(getComputedStyle(document.body).paddingTop, 10);
    document.body.style.paddingTop = (bodyPadding + navbar.offsetHeight) + 'px';
  };
  
  // Cria a barra quando o DOM estiver completamente carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNavbar);
  } else {
    createNavbar();
  }
})();