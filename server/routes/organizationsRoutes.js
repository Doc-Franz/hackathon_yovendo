const express = require('express');
const organizationsController = require('./../controller/organizationsController');

const router = express.Router();

// aggiunta di una nuova compagnia
router.route('/').post(organizationsController.newOrganization);

// GET di tutte le organizzazioni
router.route('/').get(organizationsController.getAllOrganizations);

// GET di una singola organizzazione per il login da username
router
  .route('/:username')
  .get(organizationsController.getOrganizationByUsername);

// GET dei documenti di una singola organizzazione da id
router.route('/documents/:id').get(organizationsController.getOrganizationByID);

// eliminazione di un documento con id associato ad una compagnia
router.route('/:id').delete(organizationsController.deleteDocument);

module.exports = router;
