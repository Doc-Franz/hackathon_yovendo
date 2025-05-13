const express = require('express');
const twilioController = require('./../controller/twilioController');

const router = express.Router();

// ❗❗❗ Da cambiare -> richieste di prova
router.route('/').post(twilioController.sendMessage);

module.exports = router;
