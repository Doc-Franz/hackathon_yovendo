const db = require('./../db');
const upload = require('../utils/multer');

// funzione per aggiungere una nuova compagnia con i relativi documenti
exports.newOrganization = [
  upload.array('documents', 20), // si può caricare fino ad un massimo di 20 documenti
  async (req, res) => {
    const { name, username, password } = req.body; // info della compagnia
    const files = req.files; // array di oggetti file generato da multer

    try {
      // salvo le info dell'organizzazione nel db
      const orgInfo = await db.one(
        'INSERT INTO organizations(name, username, password) VALUES($1, $2, $3) RETURNING *',
        [name, username, password],
      );

      const uploadedDocs = [];

      for (const file of files) {
        const doc = await db.one(
          `INSERT INTO organization_documents(organization_id, filename, mimetype, file_url)
           VALUES($1, $2, $3, $4) RETURNING *`,
          [orgInfo.id, file.originalname, file.mimetype, file.path],
        );
        uploadedDocs.push(doc);
      }

      res.status(201).json({
        message: 'The organization has been added',
        content: orgInfo,
        documents: uploadedDocs,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  },
];

// funzione per eliminare i documenti di una compagnia
exports.deleteDocument = async (req, res) => {
  const { id } = req.params; // recupero l'id del documento da eliminare dall'URL
  console.log(id);

  try {
    const deleted = await db.result(
      `DELETE FROM organization_documents WHERE id = $1`,
      [id],
    );

    if (deleted.rowCount == 0) {
      res.status(400).json({ message: 'Documento non trovato' });
    }

    res.status(200).json({ message: 'Documento eliminato con successo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
