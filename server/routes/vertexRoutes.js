const express = require('express');
const vertexController = require('./../controller/vertexController');

const router = express.Router();

// ❗❗❗ Da cambiare -> richieste di prova
router.route('/').get(vertexController.generate_from_text_input);

module.exports = router;
