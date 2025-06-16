const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller');

router.get('/', personController.getAll);

module.exports = router;
