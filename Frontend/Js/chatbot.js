function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "http://127.0.0.1:5501/Frontend/Pages/Login.html";
    }
  }