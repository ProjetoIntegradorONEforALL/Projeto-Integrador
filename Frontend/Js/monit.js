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