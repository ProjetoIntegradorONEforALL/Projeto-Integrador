

  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

  function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "http://127.0.0.1:5501/Frontend/Pages/Login.html";
    }
  }




// Variáveis globais para os gráficos
let erroChart, eficienciaChart, materiaisChart;

// Inicialização dos gráficos
function initCharts() {
  const erroCtx = document.getElementById('erroChart');
  erroChart = new Chart(erroCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Erros',
        data: [],
        backgroundColor: '#db504a'
      }]
    },
    options: {
      animation: false,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const eficienciaCtx = document.getElementById('eficienciaChart');
  eficienciaChart = new Chart(eficienciaCtx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Eficiência (%)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)'
      }]
    },
    options: {
      animation: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Eficiência de Separação (%)',
          font: { size: 18, weight: 'bold' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: 'Eficiência (%)' }
        }
      }
    }
  });

  const materiaisCtx = document.getElementById('materiaisChart');
  materiaisChart = new Chart(materiaisCtx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: "qntd.",
        data: [],
        backgroundColor: ["#42a5f5", "#66bb6a"]
      }]
    },
    options: {
      responsive: true
    }
  });
}

// Função para atualizar os dados
function updateData(data) {
  // Atualiza os cartões de status
  document.getElementById('esteiraStatus').textContent = data.esteiraStatus || 'Desconhecido';
  document.getElementById('esteiraStatus').className = data.esteiraStatus === 'Ligada' ? 'ok' : 'fail';

  document.getElementById('sensorOptico').textContent = data.sensorOptico || 'Desconhecido';
  document.getElementById('sensorOptico').className = data.sensorOptico === 'OK' ? 'ok' : 'fail';

  document.getElementById('sensorMetal').textContent = data.sensorMetal || 'Desconhecido';
  document.getElementById('sensorMetal').className = data.sensorMetal === 'OK' ? 'ok' : 'fail';

  // Atualiza os gráficos
  eficienciaChart.data.labels = data.eficienciaLabels || [];
  eficienciaChart.data.datasets[0].data = data.eficienciaData || [];
  eficienciaChart.update();

  erroChart.data.labels = data.erroLabels || [];
  erroChart.data.datasets[0].data = data.erroData || [];
  erroChart.update();

  materiaisChart.data.labels = data.materiaisLabels || [];
  materiaisChart.data.datasets[0].data = data.materiaisData || [];
  materiaisChart.update();
}

// Busca inicial de dados mocados via API
async function fetchMockedData() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/monitoring', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Falha ao buscar dados mocados');
    const data = await response.json();
    updateData(data);
  } catch (error) {
    console.error('Erro ao buscar dados mocados:', error);
    updateData({
      esteiraStatus: 'Erro',
      sensorOptico: 'Erro',
      sensorMetal: 'Erro',
      eficienciaLabels: ['Erro'],
      eficienciaData: [0],
      erroLabels: ['Erro'],
      erroData: [0],
      materiaisLabels: ['Erro'],
      materiaisData: [0]
    });
  }
}

// Conexão com Socket.IO para atualizações (opcional, se quiser simular atualizações)
/*
function connectSocket() {
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Conectado ao Socket.IO');
    socket.emit('subscribe', 'monitoring');
  });

  socket.on('update', (data) => {
    console.log('Dados atualizados via Socket.IO:', data);
    updateData(data);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado do Socket.IO');
  });
}
*/

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  fetchMockedData();
//  connectSocket(); // Opcional, se o backend simular atualizações via Socket.IO
  setInterval(fetchMockedData, 5000); // Atualiza a cada 5 segundos

  

  // Funções existentes
  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

  function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "http://127.0.0.1:5501/Frontend/Pages/Login.html";
    }
  }
});