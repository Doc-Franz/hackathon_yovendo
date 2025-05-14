const express = require('express');
const twilioController = require('./../controller/twilioController');

const router = express.Router();

router.route('/whatsapp-webhook').post(twilioController.messageFromUser);

module.exports = router;
