const express = require('express');
const organizationsController = require('./../controller/organizationsController');

const router = express.Router();

router.route('/').post(organizationsController.newOrganization);

module.exports = router;
