const express = require('express');
const router = express.Router();

// Endpoint mocado para monitoramento
router.get('/monitoring', (req, res) => {
  const mockedData = {
    esteiraStatus: 'Ligada',
    sensorOptico: 'OK',
    sensorMetal: 'OK',
    eficienciaLabels: ['-5', '-4', '-3', '-2', '-1', 'Agora'],
    eficienciaData: [85, 88, 82, 90, 87, 92],
    erroLabels: ['-5', '-4', '-3', '-2', '-1', 'Agora'],
    erroData: [2, 1, 0, 3, 1, 2],
    materiaisLabels: ['Plástico', 'Metal'],
    materiaisData: [600, 500]
  };
  res.json(mockedData);
});

module.exports = router;