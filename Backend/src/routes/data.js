const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cache = require('../services/cache');

// Receive data from Postman/Node-RED
router.post('/receive', auth, async (req, res) => {
  try {
    const data = req.body; // Dados JSON enviados via Postman
    console.log('Dados recebidos:', data);

    // Armazenar no cache (ex.: por 5 minutos)
    await cache.set('latest_received_data', data, 300);

    res.json({
      status: 'success',
      message: 'Dados recebidos com sucesso',
      receivedData: data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Falha ao receber dados',
      error: error.message
    });
  }
});

module.exports = router;