const express = require('express');
const organizationsController = require('./../controller/organizationsController');

const router = express.Router();

// aggiunta di una nuova compagnia
router.route('/').post(organizationsController.newOrganization);

// GET dei documenti associati ad una compagnia con organization_id
// router.route('/:organization_id').get(organizationsController.getDocuments);

// eliminazione di un documento con id associato ad una compagnia
router.route('/:id').delete(organizationsController.deleteDocument);

module.exports = router;
