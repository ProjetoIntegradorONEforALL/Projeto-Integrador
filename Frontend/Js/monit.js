const ENDPOINT_MONITORAMENTO = 'http://52.20.151.92:3000/api/v1/monitoring';

let eficienciaChart, erroChart, materiaisChart;

// Inicializa os gráficos Chart.js (sem mudanças aqui)
function inicializaGraficos() {
  eficienciaChart = new Chart(document.getElementById('eficienciaChart'), {
    type: 'line', // Pode ser 'line' ou 'bar' dependendo da sua preferência visual para Eficiência
    data: {
      labels: [],
      datasets: [{
        label: 'Eficiência (%)',
        data: [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76,175,80,0.2)',
        fill: 'origin' // Para um gráfico de área suave
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Ajuda na responsividade
      scales: { y: { min: 0, max: 100 } }, // Escala de 0 a 100%
      plugins: {
          legend: { display: true } // Mostra a legenda
      }
    }
  });

  erroChart = new Chart(document.getElementById('erroChart'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Erros/Hora',
        backgroundColor: '#F44336',
        data: []
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true }
        }
    }
  });

  materiaisChart = new Chart(document.getElementById('materiaisChart'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Produção',
        backgroundColor: '#2196F3',
        data: []
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
         plugins: {
            legend: { display: true }
        }
    }
  });
}

// Atualiza os cards com os dados MAIS RECENTES (um único objeto)
function atualizarCards(latestData) {
  if (!latestData) {
      // Caso não haja dados retornados, exibe indicadores de "sem dados"
      document.getElementById('esteiraStatus').textContent = '--';
      document.getElementById('sensorOptico').textContent = '--';
      document.getElementById('sensorMetal').textContent = '--';
      return;
  }
  document.getElementById('esteiraStatus').textContent =
    latestData.esteiraStatus === 'Ligada' ? 'Ligada' : 'Desligada';
  document.getElementById('sensorOptico').textContent = latestData.sensorOptico ? 'OK' : 'Falha';
  document.getElementById('sensorMetal').textContent = latestData.sensorMetais ? 'OK' : 'Falha';
}

// Atualiza os gráficos com o ARRAY COMPLETO dos últimos dados
function atualizarGraficos(dataArray) {
    // Limpa os dados existentes nos gráficos antes de adicionar os novos 10 pontos
    eficienciaChart.data.labels = [];
    eficienciaChart.data.datasets[0].data = [];
    erroChart.data.labels = [];
    erroChart.data.datasets[0].data = [];
    materiaisChart.data.labels = [];
    materiaisChart.data.datasets[0].data = [];

    // Como o backend retorna os dados mais recentes PRIMEIRO (DESC),
    // vamos iterar de trás para frente no array para que os horários no gráfico
    // apareçam em ordem crescente (mais antigo à esquerda, mais novo à direita).
    const reversedData = [...dataArray].reverse(); // Cria uma cópia e inverte

    reversedData.forEach(item => {
        const horario = item.timestamp
            ? new Date(item.timestamp).toLocaleTimeString('pt-BR') // Formata a hora
            : '--:--';

        // Adiciona os dados de CADA ITEM do array aos gráficos
        eficienciaChart.data.labels.push(horario);
        eficienciaChart.data.datasets[0].data.push(item.eficienciaSeparacao ?? 0); // <-- Usa item.eficienciaSeparacao

        erroChart.data.labels.push(horario);
        erroChart.data.datasets[0].data.push(item.errosPorHora ?? 0); // <-- Usa item.errosPorHora

        materiaisChart.data.labels.push(horario);
        materiaisChart.data.datasets[0].data.push(item.quantidadeProduzida ?? 0); // <-- Usa item.quantidadeProduzida
    });

    // Atualiza os gráficos para renderizar os novos dados
    eficienciaChart.update();
    erroChart.update();
    materiaisChart.update();
}

// Busca os dados do backend e processa
async function buscarEDesenhar() {
  try {
    const resp = await fetch(ENDPOINT_MONITORAMENTO);
    // Verifica se a resposta HTTP foi bem-sucedida
    if (!resp.ok) {
      // Lança um erro com mais detalhes se a resposta não for OK
      throw new Error(`Erro HTTP! Status: ${resp.status} (${resp.statusText})`);
    }
    const data = await resp.json(); // data é o ARRAY dos 10 objetos

    // Verifica se recebeu dados e se o array não está vazio
    if (data && Array.isArray(data) && data.length > 0) {
        // Passa APENAS o objeto mais recente (o primeiro do array DESC) para os cards
        atualizarCards(data[0]);
        // Passa o ARRAY completo para atualizar os gráficos
        atualizarGraficos(data);
    } else {
        console.warn("API retornou nenhum dado ou um formato inesperado.");
        // Lida com o caso de não haver dados (limpa cards e gráficos)
        atualizarCards(null);
        atualizarGraficos([]); // Passa um array vazio para limpar os gráficos
    }

  } catch (e) {
    // Captura e loga qualquer erro durante a busca ou processamento dos dados
    console.error("Falha na atualização:", e);
    // Opcional: Atualizar a interface do usuário para mostrar um status de erro
  }
}

// Executa ao carregar a janela
window.onload = () => {
  inicializaGraficos(); // Cria as instâncias dos gráficos
  buscarEDesenhar(); // Faz a primeira busca e desenha
  setInterval(buscarEDesenhar, 5000); // Configura busca e atualização periódica
};