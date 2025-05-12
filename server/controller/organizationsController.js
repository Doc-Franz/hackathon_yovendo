const db = require('./../db');
const upload = require('../utils/multer');

exports.newOrganization = [
  upload.array('documents', 20),
  async (req, res) => {
    const { name, username, password } = req.body;
    const files = req.files;

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
          [orgInfo.id, file.originalname, file.mimetype, file.url],
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
