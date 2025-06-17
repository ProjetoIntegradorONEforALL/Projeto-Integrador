const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const flaskResponse = await axios.post('http://flask_app_container:5000/api/chatbot', {
      mensagem: req.body.mensagem
    });

    res.json({ resposta: flaskResponse.data.resposta });
  } catch (error) {
    console.error('Erro ao comunicar com o Flask:', error.message);
    res.status(500).json({ resposta: 'Erro ao processar a mensagem.' });
  }
});

module.exports = router;
