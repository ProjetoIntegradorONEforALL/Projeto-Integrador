// /Frontend/Js/script.js  (ou renomeie para common.js)

// Função para expandir/colapsar a sidebar - UI Geral
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
  } else {
    console.warn("Elemento com ID 'sidebar' não encontrado na função toggleSidebar.");
  }
}

// Função para confirmar logout - Lógica UI/Autenticação Geral
function confirmLogout(event) {
  // Impede a ação padrão do link
  event.preventDefault();
  // Exibe um pop-up de confirmação
  if (confirm("Tem certeza que deseja sair?")) {
    // Se o usuário confirmar, redireciona para a página de login
    window.location.href = "login.html"; // Ajuste o nome do arquivo se for diferente
  }
}

// Remova daqui a lógica de fetch, atualização de cards e criação de gráficos!
// Essa lógica específica do dashboard irá para o dashboard.js