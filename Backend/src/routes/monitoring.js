const express = require('express');
const router = express.Router();

// Simulando dados de monitoramento
router.get('/', (req, res) => {
  res.json({
    esteiraStatus: 'Ligada',
    sensorOptico: 'OK',
    sensorMetal: 'OK',
    eficienciaLabels: ['10:00', '11:00', '12:00'],
    eficienciaData: [95, 92, 97],
    erroLabels: ['10:00', '11:00', '12:00'],
    erroData: [1, 0, 2],
    materiaisLabels: ['Plástico', 'Metal'],
    materiaisData: [120, 85]
  });
});

module.exports = router;
