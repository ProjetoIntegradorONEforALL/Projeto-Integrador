// dashboard.js (no seu backend Node.js, dentro de src/routes/)

const express = require('express');
const router = express.Router();
// Importa o pool de conexões com o banco de dados
// Certifique-se que o caminho para o seu arquivo de conexão (ex: services/database.js) está correto
const pool = require('../services/database');

// Rota GET para /api/v1/dashboard
router.get('/', async (req, res) => {
  let client; // Declara a variável client fora do try para garantir a liberação no finally
  try {
    // 1. Adquire um cliente do pool de conexões para usar nesta requisição
    client = await pool.connect();

    // --- 2. Obter os valores mais recentes para os cards de resumo ---
    // Consulta a tabela production_readings para pegar a última leitura
    // Estes campos vêm diretamente do seu DDL de production_readings
    const latestReadingsQuery = `
      SELECT
        quantidade_por_tempo,
        quantidade_erros,
        materiais_processados
      FROM production_readings
      ORDER BY leitura_timestamp DESC
      LIMIT 1;
    `;
    const latestReadingsResult = await client.query(latestReadingsQuery);

    // Extrai os dados da última leitura. Se não houver leituras ainda, usa valores padrão 0.
    const latestData = latestReadingsResult.rows.length > 0 ? latestReadingsResult.rows[0] : {
        quantidade_por_tempo: 0,
        quantidade_erros: 0,
        materiais_processados: 0
    };

    // --- 3. Obter dados para o gráfico de quantidade por tempo ---
    // Pega os 10 últimos registros individuais de quantidade_por_tempo ordenados por tempo
    const prodChartQuery = `
    WITH LatestReadings AS (
      SELECT
        leitura_timestamp,
        quantidade_por_tempo
      FROM production_readings
      ORDER BY leitura_timestamp DESC -- Ordena do mais recente para o mais antigo
      LIMIT 10 -- Pega os 10 primeiros (que são os 10 mais recentes)
    )
    SELECT
      leitura_timestamp as tempo, -- Alias para 'tempo'
      quantidade_por_tempo as valor -- Alias para 'valor'
    FROM LatestReadings
    ORDER BY leitura_timestamp ASC; -- Ordena esses 10 resultados do mais antigo para o mais recente (para o gráfico)
  `;
    const prodChartResult = await client.query(prodChartQuery);

    // --- 4. Obter dados para o gráfico de erros por tempo ---
    // Pega os 10 últimos valores CRUS do contador quantidade_erros
    // Usando CTE para ordenar primeiro DESC e depois ASC nos resultados
    const errorsChartQuery = `
      WITH LatestErrorReadings AS (
        SELECT
          leitura_timestamp,
          quantidade_erros
        FROM production_readings
        ORDER BY leitura_timestamp DESC
        LIMIT 10
      )
      SELECT
        leitura_timestamp as tempo, -- Alias para 'tempo'
        quantidade_erros as valor -- Alias para 'valor', usando o valor CUMULATIVO cru
      FROM LatestErrorReadings
      ORDER BY leitura_timestamp ASC;
    `;
    const errorsChartResult = await client.query(errorsChartQuery);

    // --- 5. AJUSTADO: Obter dados para o gráfico de materiais processados (TOTAL ao longo do tempo) ---
    // Esta query agora pega os 10 últimos registros de 'production_readings'
    // para mostrar a evolução do valor total de materiais_processados ao longo do tempo.
    const materialsChartQuery = `
      WITH LatestMaterialReadings AS ( -- CTE para pegar os últimos 10 registros da tabela production_readings
          SELECT
              leitura_timestamp,
              materiais_processados
          FROM production_readings
          ORDER BY leitura_timestamp DESC -- Ordena do mais recente para o mais antigo
          LIMIT 10 -- Pega os 10 últimos registros
      )
      SELECT
          leitura_timestamp as tempo, -- Usamos o timestamp da leitura para o eixo X no frontend
          materiais_processados as valor -- Usamos o valor TOTAL de materiais_processados para o eixo Y
      FROM LatestMaterialReadings
      ORDER BY leitura_timestamp ASC; -- Ordena para exibição correta no gráfico (do mais antigo para o mais recente)
    `;
    const materialsChartResult = await client.query(materialsChartQuery);

    // O resultado agora será no formato: [{ tempo: "timestamp da leitura", valor: valor total processado naquela leitura }, ...]

    // --- 6. Montar o objeto de resposta final no formato que o frontend espera ---
    const dashboardData = {
      quantidade_por_tempo: latestData.quantidade_por_tempo,
      quantidade_erros: latestData.quantidade_erros,
      materiais_processados: latestData.materiais_processados, // Este ainda é o último valor para o card de resumo
      grafico_qtd_tempo: prodChartResult.rows, // Array de { tempo, valor }
      grafico_erros: errorsChartResult.rows, // Array de { tempo, valor } - Últimos 10 valores CUMULATIVOS de erros
      grafico_materiais: materialsChartResult.rows // AGORA: Array de { tempo, valor } do TOTAL processado ao longo do tempo (das últimas 10 leituras)
    };

    console.log('Dados do dashboard obtidos do banco e gerados para resposta:', dashboardData);

    // 7. Envia a resposta JSON para o frontend
    res.json(dashboardData);

  } catch (error) {
    // Em caso de qualquer erro (conexão com BD, query SQL, etc.)
    console.error('Falha ao obter dados para o dashboard do BD:', error);
    res.status(500).json({ // Envia uma resposta de erro 500 para o frontend
      status: 'error',
      message: 'Falha ao obter dados para o dashboard',
      error: error.message, // Inclui a mensagem de erro
      // details: error.stack // Inclui o stack trace para ajudar na depuração (REMOVER EM PRODUÇÃO)
    });
  } finally {
    // 8. MUITO IMPORTANTE: Libera o cliente de volta para o pool
    // Isso deve acontecer SEMPRE, mesmo que ocorra um erro
    if (client) {
      client.release();
      console.log('Cliente do pool de DB liberado.');
    }
  }
});

// Exporta o router para ser usado no app.js
module.exports = router;