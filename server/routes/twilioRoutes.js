const express = require('express');
const twilioController = require('./../controller/twilioController');

const router = express.Router();

router
  .route('/')
  .post(twilioController.sendMessage)
  .get(twilioController.generate_from_text_input);

module.exports = router;
