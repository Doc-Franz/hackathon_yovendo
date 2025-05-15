const express = require('express');
const organizationsController = require('./../controller/organizationsController');

const router = express.Router();

// aggiunta di una nuova compagnia
router.route('/').post(organizationsController.newOrganization);

// GET di tutte le organizzazioni
router.route('/').get(organizationsController.getAllOrganizations);

// eliminazione di un documento con id associato ad una compagnia
router.route('/:id').delete(organizationsController.deleteDocument);

module.exports = router;
