const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth'); // Se não quiser autenticação no teste
const cache = require('../services/cache');
const db = require('../services/database'); // Renomeei 'connection' para 'db' para maior clareza

// Middleware para parsear JSON no corpo da requisição (muito importante!)
// Certifique-se de que este middleware está sendo usado ANTES desta rota.
// Normalmente, ele é configurado no seu arquivo principal do Express (app.js ou server.js):
// app.use(express.json());
// Se você está usando 'router.post('/', ...)' e não 'app.post',
// pode ser necessário adicionar 'router.use(express.json());' aqui,
// ou garantir que seu middleware global para JSON já esteja ativo.
router.use(express.json());


// Receive data from Postman/Node-RED
router.post('/', async (req, res) => {
  try {
    const data = req.body; // Dados JSON enviados via Postman/Node-RED
    console.log('Dados recebidos:', data);

    // --- Lógica para salvar no PostgreSQL ---
    // 1. Extrair os dados do JSON
    // Adapte estes nomes de campo para os que realmente vêm do seu Node-RED
    const { sensorId, temperature, humidity, status, timestamp } = data;

    // 2. Definir a query SQL para inserção
    const insertQuery = `
      INSERT INTO sensor_data (
        timestamp,
        sensor_id,
        temperature,
        humidity,
        status
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id, received_at; -- Retorna o ID gerado e a data de inserção
    `;

    // 3. Definir os parâmetros para a query
    // IMPORTANTE: O `timestamp` precisa ser um objeto Date ou uma string formatada que o PostgreSQL entenda.
    // Se Node-RED envia uma string ISO, `new Date(timestamp)` geralmente funciona.
    const queryParams = [
      timestamp ? new Date(timestamp) : new Date(), // Usa o timestamp do JSON, ou o tempo atual se não fornecido
      sensorId,
      temperature,
      humidity,
      status
    ];

    // 4. Executar a query usando a conexão com o banco de dados
    const result = await db.query(insertQuery, queryParams);
    const newRecord = result.rows[0]; // O registro inserido, com ID e received_at

    console.log('Dados salvos no banco de dados com ID:', newRecord.id);

    // --- Fim da lógica para salvar no PostgreSQL ---

    // Armazenar no cache (ex.: por 5 minutos)
    await cache.set('latest_received_data', data, 300);

    res.json({
      status: 'success',
      message: 'Dados recebidos e salvos com sucesso!',
      receivedData: data,
      databaseRecord: newRecord // Opcional: retorna o registro salvo no DB
    });
  } catch (error) {
    console.error('Falha ao processar e salvar dados:', error);
    res.status(500).json({
      status: 'error',
      message: 'Falha ao receber e/ou salvar dados',
      error: error.message
    });
  }
});

module.exports = router;