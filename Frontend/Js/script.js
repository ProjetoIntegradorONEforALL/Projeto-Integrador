const eficienciaElement = document.getElementById("eficiencia");
const errosElement = document.getElementById("erros");
const materiaisElement = document.getElementById("materiais");

fetch('http://localhost:3000/api/v1/dashboard')
  .then(res => res.json())
  .then(data => {
    eficienciaElement.textContent = data.quantidade_por_tempo + '%';
    errosElement.textContent = data.quantidade_erros;
    materiaisElement.textContent = data.materiais_processados;

    // Gráfico de produção por tempo (barra)
    new Chart(document.getElementById('eficienciaChart'), {
      type: 'bar',
      data: {
        labels: data.grafico_qtd_tempo.map(p => p.mes),
        datasets: [{
          label: 'Produção',
          data: data.grafico_qtd_tempo.map(p => p.valor),
          backgroundColor: '#76c7c0'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

    // Gráfico de erros (linha)
    new Chart(document.getElementById('errosChart'), {
      type: 'line',
      data: {
        labels: data.grafico_erros.map(e => e.mes),
        datasets: [{
          label: 'Erros',
          data: data.grafico_erros.map(e => e.valor),
          borderColor: '#e74c3c',
          backgroundColor: 'transparent',
          pointBackgroundColor: '#e74c3c',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

    // Gráfico de materiais processados (barra horizontal)
    new Chart(document.getElementById('materiaisChart'), {
      type: 'bar',
      data: {
        labels: data.grafico_materiais.map(m => m.tipo),
        datasets: [{
          label: 'Quantidade',
          data: data.grafico_materiais.map(m => m.valor),
          backgroundColor: ['#3498db', '#2ecc71']
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  })
  .catch(err => console.error('Erro ao carregar dados:', err));


  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

  function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "Login.html";
    }
  }

  function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}