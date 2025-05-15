const express = require('express');
const twilioController = require('./../controller/twilioController');

const router = express.Router();

// risposta del chatbot
router.route('/whatsapp-webhook').post(twilioController.messageFromUser);

// salvataggio dell'id dell'azienda
router.route('/:id').get(twilioController.getOrganization);

module.exports = router;
