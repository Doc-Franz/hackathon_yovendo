const db = require('./../db');
const upload = require('../utils/multer');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const XLSX = require('xlsx');
const Tesseract = require('tesseract.js');

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
    } else {
      res.status(200).json({ message: 'Documento eliminato con successo' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// funzione per recuperare tutti i documenti di una compagnia
exports.getDocuments = async (req, res) => {
  const { organization_id } = req.params;

  try {
    // recupero i documenti dal db
    const docs = await db.any(
      `SELECT filename, file_url FROM organization_documents WHERE organization_id = $1`,
      [organization_id],
    );

    if (docs.length == 0) {
      res.status(404).json({ message: 'Nessun documento trovato' });
    } else {
      // res.status(200).json({ documents: docs });
      for (const doc of docs) {
        console.log(`Scarico e leggo: ${doc.file_url}`);
        const response = await axios.get(doc.file_url, {
          responseType: 'arraybuffer',
        });

        const mime = doc.mimetype;

        if (mime === 'application/pdf') {
          const pdfData = await pdfParse(response.data);
          fullText += pdfData.text + '\n';
        } else if (
          mime ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          const result = await mammoth.extractRawText({
            buffer: response.data,
          });
          fullText += result.value + '\n';
        } else if (
          mime ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          const workbook = XLSX.read(response.data, { type: 'buffer' });
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetText = XLSX.utils.sheet_to_csv(worksheet);
            fullText += sheetText + '\n';
          });
        } else if (mime.startsWith('text/')) {
          const textContent = response.data.toString('utf8');
          fullText += textContent + '\n';
        } else if (mime.startsWith('image/')) {
          console.log(`Elaborazione OCR per immagine: ${doc.file_url}`);
          const {
            data: { text },
          } = await Tesseract.recognize(response.data, 'eng');
          fullText += text + '\n';
        } else {
          console.warn(`Tipo non supportato: ${mime}`);
        }
      }
      return fullText;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
