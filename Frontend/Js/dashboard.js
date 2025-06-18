// /Frontend/Js/dashboard.js

// --- Referências aos Elementos HTML (específicos do dashboard) ---
const eficienciaElement = document.getElementById("eficiencia");
const errosElement = document.getElementById("erros");
const materiaisElement = document.getElementById("materiais");

const eficienciaChartCanvas = document.getElementById('eficienciaChart');
const errosChartCanvas = document.getElementById('errosChart');
const materiaisChartCanvas = document.getElementById('materiaisChart');

// --- Variáveis para armazenar as instâncias dos gráficos ---
let eficienciaChartInstance = null;
let errosChartInstance = null;
let materiaisChartInstance = null;


// --- Lógica de Busca de Dados e Atualização da UI ---
async function fetchDashboardData() {
  try {
    // Faz a requisição GET para o endpoint do backend
    const response = await fetch('http://52.20.151.92:3000/api/v1/dashboard');

    // Verifica se a resposta HTTP foi bem-sucedida
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido na resposta');
      throw new Error(`Erro HTTP! Status: ${response.status}. Detalhes: ${errorText}`);
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Loga os dados recebidos para inspeção no console
    console.log('Dados recebidos do backend:', data);

     // Verifica se os dados recebidos são válidos
     if (!data || typeof data !== 'object') {
         console.error('Resposta JSON inválida ou inesperada recebida:', data);
         // Atualiza cards com mensagem de erro
         if (eficienciaElement) eficienciaElement.textContent = 'Erro';
         if (errosElement) errosElement.textContent = 'Erro';
         if (materiaisElement) materiaisElement.textContent = 'Erro';
         return; // Para a execução se os dados não forem válidos
     }

    // --- Atualiza o conteúdo dos elementos dos cards ---
    // Atualiza o card de Quantidade por Tempo
    if (eficienciaElement) {
        // Exibe o valor diretamente, sem adicionar '%'
        eficienciaElement.textContent = data.quantidade_por_tempo !== undefined && data.quantidade_por_tempo !== null
            ? data.quantidade_por_tempo
            : 'N/A';
    }
    // Atualiza o card de Quantidade de Erros
    if (errosElement) {
         errosElement.textContent = data.quantidade_erros !== undefined && data.quantidade_erros !== null
            ? data.quantidade_erros
            : 'N/A';
    }
    // Atualiza o card de Materiais Processados
    if (materiaisElement) {
        // Adiciona 'qtd' de volta
        materiaisElement.textContent = data.materiais_processados !== undefined && data.materiais_processados !== null
            ? `${data.materiais_processados} qtd`
            : 'N/A';
    }

    // --- Cria/Atualiza os Gráficos Chart.js ---

    // --- Gráfico de produção por tempo (barra vertical) ---
    // Só cria o gráfico se o canvas existir E houver dados válidos para ele
    if (eficienciaChartCanvas && data.grafico_qtd_tempo && Array.isArray(data.grafico_qtd_tempo) && data.grafico_qtd_tempo.length > 0) {
        // Destrói a instância anterior do gráfico se ela existir antes de criar a nova
        if (eficienciaChartInstance) {
            eficienciaChartInstance.destroy();
        }

        // Cria uma nova instância do gráfico e a armazena
        eficienciaChartInstance = new Chart(eficienciaChartCanvas, {
          type: 'bar', // Tipo de gráfico: barra
          data: {
            // Mapeia usando 'p.tempo' e formata a data para exibição
            labels: data.grafico_qtd_tempo.map(p => {
                const date = new Date(p.tempo); // Cria um objeto Date a partir do timestamp
                // Formata a data/hora de forma legível (ex: 'DD/MM HH:MM')
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() é 0-indexado
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}/${month} ${hours}:${minutes}`;
                // Se preferir apenas Hora:Minuto, use:
                // return `${hours}:${minutes}`;
            }),
            // Mapeia os valores usando 'p.valor' (já correto da query)
            datasets: [{
              label: 'Quantidade', // Rótulo do dataset
              data: data.grafico_qtd_tempo.map(p => p.valor),
              backgroundColor: '#76c7c0' // Cor das barras
            }]
          },
          options: {
            responsive: true, // Gráfico responsivo
            maintainAspectRatio: false, // Permite controlar tamanho via CSS
            plugins: {
              legend: { display: false }, // Oculta a legenda
              title: { display: true, text: 'Quantidade por Leitura (Últimos 10)' } // Título do gráfico
            },
            scales: { // Configuração dos eixos
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Quantidade' } // Título do eixo Y
                },
                x: {
                    title: { display: true, text: 'Data/Hora da Leitura' }, // Título do eixo X
                     ticks: {
                         autoSkip: true, // Ajuda a evitar sobreposição de labels
                         maxRotation: 0 // Mantém os labels na horizontal
                     }
                }
            }
          }
        });
        // Garante que o canvas está visível se os dados estiverem ok
        if (eficienciaChartCanvas) eficienciaChartCanvas.style.display = 'block';
    } else {
        // Loga um aviso se não houver dados para o gráfico
        console.warn("Dados para o gráfico de produção ausentes ou inválidos. Gráfico de Quantidade por Tempo não será renderizado.");
         // Destrói a instância antiga se existir e esconde o canvas
         if (eficienciaChartInstance) {
            eficienciaChartInstance.destroy();
            eficienciaChartInstance = null;
         }
         if (eficienciaChartCanvas) eficienciaChartCanvas.style.display = 'none';
    }

    // --- Gráfico de erros (barra vertical) ---
    // Gráfico de erros por hora (barra) com título dinâmico e últimos 10 períodos
    if (errosChartCanvas && data.grafico_erros && Array.isArray(data.grafico_erros) && data.grafico_erros.length > 0) {
        // Destrói a instância anterior do gráfico se ela existir
         if (errosChartInstance) {
            errosChartInstance.destroy();
        }
        // Cria uma nova instância e a armazena
        errosChartInstance = new Chart(errosChartCanvas, {
          type: 'bar', // Tipo de gráfico: barra
          data: {
            // Mapeia usando 'e.tempo' (timestamp da hora) e formata
            labels: data.grafico_erros.map(e => {
                const date = new Date(e.tempo); // Cria objeto Date a partir do timestamp
                // Formata a hora (ex: 'DD/MM HH:00')
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                // Exemplo: 'DD/MM HH:00' para clareza se os dados cruzarem dias
                return `${day}/${month} ${hours}:00`;
                 // Se quiser apenas a hora 'HH:00':
                 // return `${hours}:00`;
            }),
            // Mapeia os valores usando 'e.valor' (o total de erros na hora)
            datasets: [{
              label: 'Número de Erros', // Rótulo atualizado
              data: data.grafico_erros.map(e => e.valor),
              // Cor para barras de erro (vermelho)
              backgroundColor: '#e74c3c',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              // Título do gráfico dinâmico
              title: {
                display: true,
                // Usa o template string para incluir o tamanho do array recebido
                text: `Erros por Hora (Últimos ${data.grafico_erros.length} Períodos)`
              }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    // Título do eixo Y atualizado
                    title: { display: true, text: 'Número de Erros' }
                },
                x: {
                    // Título do eixo X atualizado
                    title: { display: true, text: 'Hora' }, // Ou 'Data/Hora'
                     ticks: {
                         autoSkip: true, // Ajuda a evitar sobreposição de labels
                         maxRotation: 0 // Mantém os labels na horizontal
                     }
                }
            }
          }
        });
        if (errosChartCanvas) errosChartCanvas.style.display = 'block';
    } else {
        // Loga um aviso se não houver dados para o gráfico
        console.warn("Dados para o gráfico de erros ausentes ou inválidos. Gráfico de Erros não será renderizado.");
        // Destrói a instância antiga se existir e esconde o canvas
        if (errosChartInstance) {
            errosChartInstance.destroy();
            errosChartInstance = null;
        }
        if (errosChartCanvas) errosChartCanvas.style.display = 'none'; // Corrigido aqui para usar errosChartCanvas
    }


    // --- AJUSTADO: Gráfico de materiais processados (TOTAL ao longo do tempo - BARRA) ---
    // Este gráfico agora usa os dados de 'grafico_materiais' que vêm da production_readings
    // e espera objetos com { tempo, valor }. Será exibido como um gráfico de barras.
    if (materiaisChartCanvas && data.grafico_materiais && Array.isArray(data.grafico_materiais) && data.grafico_materiais.length > 0) {
         if (materiaisChartInstance) {
            materiaisChartInstance.destroy();
        }
        materiaisChartInstance = new Chart(materiaisChartCanvas, {
          type: 'bar', // Mudando para gráfico de barra vertical
          data: {
            // Mapeia usando 'm.tempo' (o timestamp da leitura vindo do backend)
            labels: data.grafico_materiais.map(m => {
                const date = new Date(m.tempo); // Cria um objeto Date a partir do timestamp
                // Formata a data/hora de forma legível
                 const day = date.getDate().toString().padStart(2, '0');
                 const month = (date.getMonth() + 1).toString().padStart(2, '0');
                 const hours = date.getHours().toString().padStart(2, '0');
                 const minutes = date.getMinutes().toString().padStart(2, '0');
                 return `${day}/${month} ${hours}:${minutes}`;
                 // Se preferir apenas Hora:Minuto, use:
                 // return `${hours}:${minutes}`;
            }),
            // Mapeia os valores usando 'm.valor' (o total de materiais_processados naquela leitura)
            datasets: [{
              label: 'Total Processado', // Rótulo do dataset
              data: data.grafico_materiais.map(m => m.valor),
              // Cor para barras
              backgroundColor: '#3498db' // Um azul para representar o total
              // Removido borderColor, tension, fill pois são específicos de gráfico de linha
            }]
          },
          options: {
            // indexAxis: 'y', // REMOVIDO: Não é mais horizontal, é barra vertical
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }, // Oculta a legenda
              // Título atualizado para refletir que é o total ao longo do tempo
              title: { display: true, text: 'Total de Materiais Processados (Últimas Leituras)' }
            },
            scales: {
                x: {
                    beginAtZero: false, // Pode não começar em zero se os totais forem altos. Mantenha 'false'.
                    title: { display: true, text: 'Data/Hora da Leitura' }, // Título do eixo X (tempo)
                     ticks: {
                         autoSkip: true,
                         maxRotation: 0
                     }
                },
                y: {
                    beginAtZero: true, // É importante começar em zero para quantidades totais em barras
                    title: { display: true, text: 'Quantidade Total Processada' } // Título do eixo Y (valor total)
                }
            }
          }
        });
        // Garante que o canvas está visível se os dados estiverem ok
        if (materiaisChartCanvas) materiaisChartCanvas.style.display = 'block';
    } else {
         // Loga um aviso se não houver dados para o gráfico
         console.warn("Dados para o gráfico de materiais totais ausentes ou inválidos. Gráfico de Total de Materiais Processados (Barras) não será renderizado.");
         // Destrói a instância antiga se existir e esconde o canvas
         if (materiaisChartInstance) {
            materiaisChartInstance.destroy();
            materiaisChartInstance = null;
         }
         if (materiaisChartCanvas) materiaisChartCanvas.style.display = 'none';
    }

  } catch (error) {
    console.error('Falha ao carregar dados do dashboard:', error);
    // Em caso de qualquer erro, loga e limpa/esconde os elementos
    if (eficienciaChartInstance) { eficienciaChartInstance.destroy(); eficienciaChartInstance = null; }
    if (errosChartInstance) { errosChartInstance.destroy(); errosChartInstance = null; }
    if (materiaisChartInstance) { materiaisChartInstance.destroy(); materiaisChartInstance = null; }

    if (eficienciaElement) eficienciaElement.textContent = 'Erro';
    if (errosElement) errosElement.textContent = 'Erro';
    if (materiaisElement) materiaisElement.textContent = 'Erro';

    // Esconde os canvas em caso de erro geral
    if (eficienciaChartCanvas) eficienciaChartCanvas.style.display = 'none';
    if (errosChartCanvas) errosChartCanvas.style.display = 'none';
    if (materiaisChartCanvas) materiaisChartCanvas.style.display = 'none';
  }
}

// --- Inicialização ---
// Busca os dados quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', fetchDashboardData);

// Nota: Considere adicionar um mecanismo de polling se quiser atualizações em tempo real.