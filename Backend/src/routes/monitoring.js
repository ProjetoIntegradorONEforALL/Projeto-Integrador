// monitoring.js
const express = require('express');
const router = express.Router();

// Importa a instância Pool já configurada do seu arquivo database.js
const pool = require('../services/database'); // <--- Importação correta da instância


// Rota GET para buscar os últimos dados para o frontend
router.get('/', async (req, res) => { // <-- router.get('/') é o correto
  try {
    const result = await pool.query(
      `SELECT
        leitura_timestamp,
        esteira_status,
        sensor_optico,
        sensor_metais,
        eficiencia_separacao, -- <--- Esta coluna é numeric(5,2)
        erros_por_hora,
        quantidade_produzida
      FROM production_readings
      ORDER BY leitura_timestamp DESC
      LIMIT 10`
    );

    if (result.rows.length === 0) {
      console.warn('Nenhum dado encontrado na tabela production_readings');
      return res.status(200).json([]); // Retorna 200 com array vazio
    }

    // Mapeia os resultados para o formato JSON desejado pelo frontend
    const formattedData = result.rows.map(row => ({
      timestamp: row.leitura_timestamp,
      esteiraStatus: row.esteira_status,
      sensorOptico: row.sensor_optico,
      sensorMetais: row.sensor_metais,
      // *** CONVERSÃO PARA NÚMERO AQUI: Usa parseFloat() ***
      eficienciaSeparacao: parseFloat(row.eficiencia_separacao), // <--- Garante que seja um número
      errosPorHora: row.erros_por_hora,
      quantidadeProduzida: row.quantidade_produzida
    }));

    res.json(formattedData); // Retorna o array de objetos
  } catch (err) {
    console.error('Erro ao buscar dados do monitoramento da tabela production_readings:', err);
    console.error(err); // Loga o erro completo
    res.status(500).json({ error: 'Erro interno do servidor ao buscar dados.' });
  }
});

// ... (resto do código, como a rota POST /ingest)

module.exports = router;