/*
// Atualização simulada dos cartões de status
function atualizarStatus(){
  const esteiraOn = Math.random() > 0.1;
  document.getElementById('esteiraStatus').textContent = esteiraOn ? 'Ligada' : 'Desligada';
  document.getElementById('esteiraStatus').className = esteiraOn ? 'ok' : 'fail';

  const sensOpt = true, sensMet = Math.random() > 0.05;
  document.getElementById('sensorOptico').textContent = sensOpt ? 'OK' : 'Falha';
  document.getElementById('sensorOptico').className = sensOpt ? 'ok' : 'fail';

  document.getElementById('sensorMetal').textContent = sensMet ? 'OK' : 'Falha';
  document.getElementById('sensorMetal').className = sensMet ? 'ok' : 'fail';
}
setInterval(atualizarStatus, 3000);

// Gráficos Chart.js

const erroCtx = document.getElementById('erroChart');
let erroData = [2, 1, 0, 3, 1, 2];
const erroChart = new Chart(erroCtx, {
  type: 'line',
  data: {
    labels: ['-5', '-4', '-3', '-2', '-1', 'Agora'],
    datasets: [{
      label: 'Erros',
      data: erroData,
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

// Gráfico de Materiais
const materiaisChart = new Chart(document.getElementById("materiaisChart"), {
  type: 'bar',
  data: {
    labels: ["Plástico", "Metal"],
    datasets: [{
      label: "qntd.",
      data: [600, 500],
      backgroundColor: ["#42a5f5", "#66bb6a"]
    }]
  },
  options: {
    responsive: true
  }
});

// Novo gráfico de Eficiência
const eficienciaCtx = document.getElementById('eficienciaChart');
let eficienciaData = [85, 88, 82, 90, 87, 92];
const eficienciaChart = new Chart(eficienciaCtx, {
  type: 'bar',
  data: {
    labels: ['-5', '-4', '-3', '-2', '-1', 'Agora'],
    datasets: [{
      label: 'Eficiência (%)',
      data: eficienciaData,
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
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Eficiência (%)'
        }
      }
    }
  }
});

// Atualização dos gráficos
function atualizarGraficos(){
  erroData.shift(); erroData.push(Math.floor(Math.random() * 4));
  eficienciaData.shift(); eficienciaData.push(Math.floor(80 + Math.random() * 15));
  erroChart.update(); eficienciaChart.update();
}

setInterval(atualizarGraficos, 3000);

  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

  function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "http://127.0.0.1:5501/Frontend/Pages/Login.html";
    }
  }

  */


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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  fetchMockedData();
  connectSocket(); // Opcional, se o backend simular atualizações via Socket.IO

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