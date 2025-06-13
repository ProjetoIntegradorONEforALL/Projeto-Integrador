const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    quantidade_por_tempo: 95.2,
    quantidade_erros: 8,
    materiais_processados: 1454,
    grafico_qtd_tempo: [
      { mes: "Jan", valor: 85 },
      { mes: "Fev", valor: 89 },
      { mes: "Mar", valor: 90 },
      { mes: "Abr", valor: 93 },
      { mes: "Mai", valor: 92 }
    ],
    grafico_erros: [
      { mes: "Jan", valor: 8 },
      { mes: "Fev", valor: 6 },
      { mes: "Mar", valor: 4 },
      { mes: "Abr", valor: 5 },
      { mes: "Mai", valor: 3 }
    ],
    grafico_materiais: [
      { tipo: "Plástico", valor: 580 },
      { tipo: "Metal", valor: 300 }
    ]
  });
});

module.exports = router;