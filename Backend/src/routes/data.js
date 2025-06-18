// src/routes/data.js

const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth'); // Mantenha se usar autenticação
// Se você usa cache, mantenha esta linha
const cache = require('../services/cache');
// Importa o pool de conexões com o banco de dados RDS
const pool = require('../services/database'); // VERIFIQUE SE O CAMINHO ESTÁ CORRETO

// Rota para receber dados via POST
router.post('/', async (req, res) => {
  let client; // Declara a variável client fora do try
  try {
    client = await pool.connect(); // Adquire um cliente do pool

    const data = req.body; // Dados JSON enviados via Node-RED
    console.log('Dados recebidos:', data);

    // --- Lógica para salvar na tabela production_readings no RDS ---

    // 1. Extrair os dados do objeto 'data' recebido do Node-RED
    //    Use os NOMES EXATOS das chaves que você definiu no payload do Node-RED Function node.
    const {
      esteiraStatus,
      sensorOptico,
      sensorMetais,
      eficienciaSeparacao,
      errosPorHora,
      quantidadeProduzida,
      quantidadePorTempo,
      quantidadeErros,
      materiaisProcessados,
      timestamp // O timestamp original da leitura
    } = data;

    // 2. Definir a query SQL de inserção para a tabela production_readings
    //    Liste as colunas EXATAS da sua tabela production_readings.
    //    Certifique-se que a ordem das colunas corresponde à ordem dos placeholders.
    const query = `
      INSERT INTO production_readings (
        esteira_status,
        sensor_optico,
        sensor_metais,
        eficiencia_separacao,
        erros_por_hora,
        quantidade_produzida,
        quantidade_por_tempo,
        quantidade_erros,
        materiais_processados,
        leitura_timestamp -- Coluna para o timestamp do Node-RED
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id_leitura; -- Retorna o ID da linha inserida na nova tabela
    `;

    // 3. Executar a query com os dados extraídos como PARÂMETROS
    //    A ORDEM DOS VALORES NESTE ARRAY DEVE SER A MESMA DOS PLACEHOLDERS ($1, $2, etc.) na query,
    //    e corresponder à ordem das colunas listadas na query.
    const values = [
      esteiraStatus,
      sensorOptico,
      sensorMetais,
      eficienciaSeparacao,
      errosPorHora,
      quantidadeProduzida,
      quantidadePorTempo,
      quantidadeErros,
      materiaisProcessados,
      timestamp // Passa o timestamp do payload
    ];

    // Executa a query de inserção
    const result = await client.query(query, values);

    console.log('Dados de leitura de produção salvos no banco de dados com ID:', result.rows[0].id_leitura);

    // --- Fim da lógica de salvar no banco ---

    // Armazenar no cache (Opcional, se ainda precisar)
    // await cache.set('latest_received_data', data, 300);

    res.json({
      status: 'success',
      message: 'Dados recebidos e salvos na tabela de leituras',
      receivedData: data, // Pode ser útil para o Node-RED validar
      insertedId: result.rows[0].id_leitura
    });

  } catch (error) {
    console.error('Falha ao processar dados recebidos ou salvar no BD:', error);
    res.status(500).json({
      status: 'error',
      message: 'Falha ao receber ou salvar dados',
      error: error.message,
      details: error.stack // Inclui o stack trace para depuração
    });
  } finally {
    // MUITO IMPORTANTE: Libera o cliente de volta para o pool, mesmo que ocorra um erro
    if (client) {
      client.release();
    }
  }
});

module.exports = router;