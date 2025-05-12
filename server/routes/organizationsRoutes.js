const express = require('express');
const organizationsController = require('./../controller/organizationsController');

const router = express.Router();

// aggiunta di una nuova compagnia
router.route('/').post(organizationsController.newOrganization);

// eliminazione di un documento associato ad una compagnia
router.route('/:id').delete(organizationsController.deleteDocument);

module.exports = router;
